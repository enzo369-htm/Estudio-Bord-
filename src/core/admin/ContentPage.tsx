"use client";

import { useEffect, useState } from "react";
import { apiGetPage, apiSavePage } from "../api/pages";
import { MediaPicker } from "./MediaPicker";

type Props = {
  slug: string;
  heading: string;
  titleLabel: string;
  bodyLabel: string;
  imageLabel: string;
};

export function ContentPage({ slug, heading, titleLabel, bodyLabel, imageLabel }: Props) {
  const [title, setTitle] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [body, setBody] = useState("");
  const [bodyEn, setBodyEn] = useState("");
  const [imageMediaId, setImageMediaId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    void apiGetPage(slug)
      .then((page) => {
        setTitle(page.title);
        setTitleEn(page.titleEn);
        setBody(page.body);
        setBodyEn(page.bodyEn);
        setImageMediaId(page.image?.id ?? null);
      })
      .catch((err) => {
        const message = err instanceof Error ? err.message : "";
        if (message.includes("404") || message.toLowerCase().includes("no encontr")) return;
        setError(message || "No se pudo cargar");
      });
  }, [slug]);

  async function onSave(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setStatus("");
    try {
      await apiSavePage(slug, { title, titleEn, body, bodyEn, imageMediaId });
      setStatus("Guardado");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar");
    }
  }

  return (
    <main className="admin-page">
      <h1 className="admin-page__title">{heading}</h1>
      <form onSubmit={(event) => void onSave(event)}>
        <label className="admin-field">
          {titleLabel} en español
          <input value={title} onChange={(event) => setTitle(event.target.value)} />
        </label>
        <label className="admin-field">
          {titleLabel} en inglés
          <input value={titleEn} onChange={(event) => setTitleEn(event.target.value)} />
        </label>
        <label className="admin-field">
          {bodyLabel} en español
          <textarea className="admin-textarea" value={body} onChange={(event) => setBody(event.target.value)} />
        </label>
        <label className="admin-field">
          {bodyLabel} en inglés
          <textarea
            className="admin-textarea"
            value={bodyEn}
            onChange={(event) => setBodyEn(event.target.value)}
          />
        </label>
        <MediaPicker label={imageLabel} value={imageMediaId} onChange={setImageMediaId} />
        <div className="admin-actions">
          <button className="admin-login__submit" type="submit">
            Guardar
          </button>
          {status && <span>{status}</span>}
        </div>
      </form>
      {error && <p className="admin-login__error">{error}</p>}
    </main>
  );
}
