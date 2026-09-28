import { core } from "@/server/core";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function handle(request: Request) {
  return core(request);
}

export const GET = handle;
export const POST = handle;
export const PUT = handle;
export const DELETE = handle;
