"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";
import HeroIntro from "./HeroIntro";
import styles from "./DosaMobile.module.css";

export default function PublicShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className={styles.mobileShell}>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#101111",
            border: "1px solid rgba(245,243,238,.14)",
            color: "#f5f3ee",
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "0.88rem",
          },
        }}
      />
      {pathname === "/" ? <HeroIntro /> : null}
      <SiteNav />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
