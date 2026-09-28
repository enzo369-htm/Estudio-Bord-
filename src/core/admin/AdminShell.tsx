"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { logoutAdmin } from "../api/auth";

const links = [
  { href: "/admin/media", label: "Media" },
  { href: "/admin/proyectos", label: "Proyectos" },
  { href: "/admin/estudio", label: "Estudio" },
  { href: "/admin/home", label: "Home" },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function onLogout() {
    await logoutAdmin();
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="admin-app">
      <nav className="admin-nav">
        <p className="admin-nav__kicker">Admin</p>
        <p className="admin-nav__brand">Estudio Bordeaux</p>
        <div className="admin-nav__list">
          {links.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`admin-nav__link${active ? " is-active" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        <div className="admin-nav__foot">
          <Link href="/" className="admin-nav__link">
            Ver sitio
          </Link>
          <button type="button" className="admin-nav__button" onClick={() => void onLogout()}>
            Salir
          </button>
        </div>
      </nav>
      <div className="admin-app__main">{children}</div>
    </div>
  );
}
