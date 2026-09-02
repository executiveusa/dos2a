import type { ReactNode } from "react";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";
import styles from "./DosaMobile.module.css";

export default function PublicShell({ children }: { children: ReactNode }) {
  return <div className={styles.mobileShell}><SiteNav/><main>{children}</main><SiteFooter/></div>;
}
