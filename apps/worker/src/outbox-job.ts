export interface OutboxEvent{tenantId:string;eventId:string;topic:string;idempotencyKey:string;payload:Record<string,unknown>;attempts:number;maxAttempts:number}
export interface OutboxDeliveryPort{deliver(event:OutboxEvent):Promise<void>}
export type OutboxResult={status:"delivered"}|{status:"retry";availableInMs:number;error:string}|{status:"dead";error:string};
export async function processOutboxEvent(event:OutboxEvent,port:OutboxDeliveryPort):Promise<OutboxResult>{try{await port.deliver(event);return{status:"delivered"}}catch(e){const error=e instanceof Error?e.message:"delivery_failed";const next=event.attempts+1;if(next>=event.maxAttempts)return{status:"dead",error};return{status:"retry",availableInMs:Math.min(60_000,1000*2**Math.min(next,6)),error}}}
