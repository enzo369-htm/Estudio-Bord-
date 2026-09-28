"use client";

import { useEffect, useState } from "react";
import { apiListMedia } from "../api/media";
import type { MediaRecord } from "../images/types";

type Props = {
  label: string;
  value: string | null;
  onChange: (id: string | null) => void;
};

export function MediaPicker({ label, value, onChange }: Props) {
  const [items, setItems] = useState<MediaRecord[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    void apiListMedia()
      .then((data) => setItems(data.items))
      .catch((err) => setError(err instanceof Error ? err.message : "No se pudo listar"));
  }, []);

  return (
    <div>
      <p className="admin-page__copy">{label}</p>
      {error && <p className="admin-login__error">{error}</p>}
      <div className="admin-row">
        <button type="button" className="admin-nav__button" onClick={() => onChange(null)}>
          Quitar
        </button>
      </div>
      {items.length === 0 && !error && (
        <p className="admin-page__hint">No hay fotos. Subilas en Media.</p>
      )}
      <ul className="admin-media-pick">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={item.id === value ? "is-selected" : undefined}
              onClick={() => onChange(item.id)}
            >
              <img src={item.url} alt="" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
