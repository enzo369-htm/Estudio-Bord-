"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { fetchAdminSession } from "@/src/core/api/auth";
import { AdminShell } from "@/src/core/admin/AdminShell";

export default function AdminPanelLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    void fetchAdminSession().then((ok) => {
      if (!ok) {
        router.replace("/admin/login");
        return;
      }
      setReady(true);
    });
  }, [router]);

  if (!ready) {
    return (
      <div className="admin-app">
        <main className="admin-page">
          <p className="admin-page__copy">Cargando…</p>
        </main>
      </div>
    );
  }

  return <AdminShell>{children}</AdminShell>;
}
