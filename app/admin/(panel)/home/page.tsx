"use client";

import { ContentPage } from "@/src/core/admin/ContentPage";

export default function AdminHomePage() {
  return (
    <ContentPage
      slug="home"
      heading="Home"
      titleLabel="Título"
      bodyLabel="Frase"
      imageLabel="Imagen del hero"
    />
  );
}
