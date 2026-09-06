import { NextResponse } from "next/server";
import { currentUser } from "@/server/auth";
import { createArticle, listArticles } from "@/server/articles";

/** Every handler checks the session first — no route is reachable signed out. */
async function requireUser() {
  const user = await currentUser();
  if (!user) return null;
  return user;
}

export async function GET() {
  if (!(await requireUser())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ articles: await listArticles() });
}

export async function POST(request: Request) {
  const user = await requireUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const id = await createArticle(body, user.name);
  return NextResponse.json({ id }, { status: 201 });
}
