import type { ReactNode } from "react";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";

export default function PublicShell({ children }: { children: ReactNode }) {
  return <><SiteNav/><main>{children}</main><SiteFooter/></>;
}
