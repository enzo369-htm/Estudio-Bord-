"use client";

import { useParams } from "next/navigation";
import { ProjectEditor } from "@/src/core/admin/ProjectEditor";

export default function AdminProjectPage() {
  const params = useParams<{ id: string }>();
  return <ProjectEditor id={params.id} />;
}
