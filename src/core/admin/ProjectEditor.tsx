"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiGetEditorial, apiSaveEditorial } from "../api/editorial";
import { AdminCanvas } from "../modules/free-canvas/AdminCanvas";
import { MediaPicker } from "./MediaPicker";

export function ProjectEditor({ id }: { id: string }) {
  const [title, setTitle] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [body, setBody] = useState("");
  const [bodyEn, setBodyEn] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [excerptEn, setExcerptEn] = useState("");
  const [coverMediaId, setCoverMediaId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    void apiGetEditorial(id)
      .then((item) => {
        setTitle(item.title);
        setTitleEn(item.titleEn);
        setExcerpt(item.excerpt);
        setExcerptEn(item.excerptEn);
        setBody(item.body ?? "");
        setBodyEn(item.bodyEn ?? "");
        setCoverMediaId(item.cover?.id ?? null);
        setReady(true);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "No se pudo cargar"));
  }, [id]);

  async function onSave(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setStatus("");
    try {
      await apiSaveEditorial(id, {
        title,
        titleEn,
        excerpt,
        excerptEn,
        body,
        bodyEn,
        coverMediaId,
      });
      setStatus("Guardado");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar");
    }
  }

  if (!ready && !error) return <main className="admin-page">Cargando…</main>;

  return (
    <main className="admin-page admin-page--wide">
      <p className="admin-page__copy">
        <Link href="/admin/proyectos">Proyectos</Link>
      </p>
      <h1 className="admin-page__title">{title || "Proyecto"}</h1>
      <form onSubmit={(event) => void onSave(event)}>
        <label className="admin-field">
          Nombre en español
          <input value={title} onChange={(event) => setTitle(event.target.value)} required />
        </label>
        <label className="admin-field">
          Nombre en inglés
          <input value={titleEn} onChange={(event) => setTitleEn(event.target.value)} />
        </label>
        <label className="admin-field">
          Texto en español
          <textarea className="admin-textarea" value={body} onChange={(event) => setBody(event.target.value)} />
        </label>
        <label className="admin-field">
          Texto en inglés
          <textarea
            className="admin-textarea"
            value={bodyEn}
            onChange={(event) => setBodyEn(event.target.value)}
          />
        </label>
        <MediaPicker label="Portada" value={coverMediaId} onChange={setCoverMediaId} />
        <div className="admin-actions">
          <button className="admin-login__submit" type="submit">
            Guardar
          </button>
          {status && <span>{status}</span>}
        </div>
      </form>
      {error && <p className="admin-login__error">{error}</p>}
      {ready && <AdminCanvas scope={`project-${id}`} heading="Lienzo" />}
    </main>
  );
}
