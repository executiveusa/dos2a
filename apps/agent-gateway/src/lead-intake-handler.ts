import { createHash, randomUUID } from "node:crypto";
import { normalizeLeadInput, LeadValidationError } from "../../../packages/validation/src/lead-intake";
import { LeadIntakeService, UnknownServiceError, type TenantIntakePolicy } from "../../../packages/crm/src/revenue-circuit";

export interface LeadHttpRequest { method:string; bodyText:string; headers:Record<string,string|undefined> }
export interface LeadHttpResponse { status:number; headers:Record<string,string>; body:Record<string,unknown> }
const IDEMPOTENCY=/^[A-Za-z0-9._:-]{8,128}$/;

export async function handleLeadIntake(req:LeadHttpRequest,args:{service:LeadIntakeService;resolveTenant:()=>Promise<TenantIntakePolicy>;maxBodyBytes?:number}):Promise<LeadHttpResponse>{
 const headers={"cache-control":"no-store","content-type":"application/json"};
 if(req.method.toUpperCase()!=="POST")return{status:405,headers,body:{error:"method_not_allowed"}};
 const max=args.maxBodyBytes??32768;if(Buffer.byteLength(req.bodyText,"utf8")>max)return{status:413,headers,body:{error:"payload_too_large"}};
 const idem=req.headers["idempotency-key"]?.trim();if(idem&&!IDEMPOTENCY.test(idem))return{status:400,headers,body:{error:"invalid_idempotency_key"}};
 try{
  const raw=JSON.parse(req.bodyText) as Record<string,unknown>;
  const input=normalizeLeadInput(raw);
  const policy=await args.resolveTenant();
  const requestId=req.headers["x-request-id"]?.slice(0,128)||randomUUID();
  const payloadHash=createHash("sha256").update(JSON.stringify(input)).digest("hex");
  const receipt=await args.service.create({policy,input,requestId,idempotencyKey:idem,payloadHash,sourceChannel:"web"});
  return{status:receipt.duplicate?200:201,headers,body:{leadId:receipt.leadId,requestId:receipt.requestId,duplicate:receipt.duplicate}};
 }catch(error){
  if(error instanceof LeadValidationError)return{status:error.code==="spam"?202:400,headers,body:error.code==="spam"?{accepted:true}:{error:error.code}};
  if(error instanceof UnknownServiceError)return{status:400,headers,body:{error:"unknown_service"}};
  return{status:500,headers,body:{error:"internal_error"}};
 }
}
