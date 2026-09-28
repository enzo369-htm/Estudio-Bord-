import { core } from "@/server/core";

export type HomeProject = {
  id: string;
  title: string;
  src: string;
};

export type HomeContent = {
  phrase: string;
  heroSrc: string;
  projects: HomeProject[] | null;
};

const empty: HomeContent = { phrase: "", heroSrc: "", projects: null };

export async function loadHomeContent(): Promise<HomeContent> {
  if (!process.env.DATABASE_URL) return empty;
  try {
    const [pageRes, listRes] = await Promise.all([
      core(new Request("http://localhost/api/pages/home")),
      core(new Request("http://localhost/api/editorial")),
    ]);

    let phrase = "";
    let heroSrc = "";
    if (pageRes.ok) {
      const page = (await pageRes.json()) as {
        body?: string;
        image?: { url?: string } | null;
      };
      phrase = page.body?.trim() ?? "";
      heroSrc = page.image?.url ?? "";
    }

    let projects: HomeProject[] | null = null;
    if (listRes.ok) {
      const data = (await listRes.json()) as {
        items?: { id: string; title: string; cover?: { url?: string } | null }[];
      };
      if (data.items && data.items.length > 0) {
        projects = data.items.map((item) => ({
          id: item.id,
          title: item.title,
          src: item.cover?.url ?? "",
        }));
      }
    }

    return { phrase, heroSrc, projects };
  } catch {
    return empty;
  }
}
