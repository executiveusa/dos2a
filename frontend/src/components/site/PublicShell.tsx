"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";
import HeroIntro from "./HeroIntro";
import styles from "./DosaMobile.module.css";

export default function PublicShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className={styles.mobileShell}>
      {pathname === "/" ? <HeroIntro /> : null}
      <SiteNav />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
