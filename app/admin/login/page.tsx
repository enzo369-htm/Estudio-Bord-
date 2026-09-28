"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchAdminSession, loginAdmin } from "@/src/core/api/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void fetchAdminSession().then((ok) => {
      if (ok) router.replace("/admin/proyectos");
    });
  }, [router]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await loginAdmin(password);
      router.replace("/admin/proyectos");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo entrar");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="admin-login">
      <form className="admin-login__card" onSubmit={(event) => void onSubmit(event)}>
        <h1 className="admin-page__title">Estudio Bordeaux</h1>
        <label className="admin-field">
          Contraseña
          <input
            className="admin-login__input"
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        {error && <p className="admin-login__error">{error}</p>}
        <button className="admin-login__submit" type="submit" disabled={busy}>
          Entrar
        </button>
      </form>
    </main>
  );
}
