"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  apiCreateEditorial,
  apiDeleteEditorial,
  apiListEditorial,
  apiMoveEditorial,
  type EditorialItem,
} from "../api/editorial";

const empty = {
  title: "",
  titleEn: "",
  excerpt: "",
  excerptEn: "",
  body: "",
  bodyEn: "",
  coverMediaId: null as string | null,
};

export function ProjectList() {
  const [items, setItems] = useState<EditorialItem[]>([]);
  const [title, setTitle] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function reload() {
    const data = await apiListEditorial();
    setItems(data.items);
  }

  useEffect(() => {
    void reload().catch((err) => {
      setError(err instanceof Error ? err.message : "No se pudo listar");
    });
  }, []);

  async function onCreate(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      const created = await apiCreateEditorial({ ...empty, title, titleEn });
      setTitle("");
      setTitleEn("");
      setItems((prev) => [...prev, created]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo crear");
    } finally {
      setBusy(false);
    }
  }

  async function onDelete(id: string) {
    if (!window.confirm("¿Borrar este proyecto?")) return;
    setError("");
    try {
      await apiDeleteEditorial(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo borrar");
    }
  }

  async function onMove(id: string, dir: "up" | "down") {
    setError("");
    try {
      await apiMoveEditorial(id, dir);
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo ordenar");
    }
  }

  return (
    <main className="admin-page">
      <h1 className="admin-page__title">Proyectos</h1>
      <form onSubmit={(event) => void onCreate(event)}>
        <label className="admin-field">
          Nombre en español
          <input value={title} onChange={(event) => setTitle(event.target.value)} required />
        </label>
        <label className="admin-field">
          Nombre en inglés
          <input value={titleEn} onChange={(event) => setTitleEn(event.target.value)} />
        </label>
        <button className="admin-login__submit" type="submit" disabled={busy}>
          Crear proyecto
        </button>
      </form>
      {error && <p className="admin-login__error">{error}</p>}
      {items.length === 0 && !error && (
        <p className="admin-page__hint">Todavía no hay proyectos.</p>
      )}
      <ul className="admin-editorial-list">
        {items.map((item, index) => (
          <li key={item.id} className="admin-editorial-list__item">
            {item.cover ? (
              <img src={item.cover.url} alt="" />
            ) : (
              <span className="admin-editorial-list__ph" />
            )}
            <div>
              <Link href={`/admin/proyectos/${item.id}`}>{item.title}</Link>
              {item.titleEn ? <p>{item.titleEn}</p> : null}
            </div>
            <div className="admin-editorial-list__ops">
              <button type="button" disabled={index === 0} onClick={() => void onMove(item.id, "up")}>
                Subir
              </button>
              <button
                type="button"
                disabled={index === items.length - 1}
                onClick={() => void onMove(item.id, "down")}
              >
                Bajar
              </button>
              <button type="button" onClick={() => void onDelete(item.id)}>
                Borrar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
