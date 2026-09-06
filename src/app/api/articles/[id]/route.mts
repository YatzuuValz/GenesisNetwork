import { NextResponse } from "next/server";
import { currentUser } from "@/server/auth";
import { deleteArticle, getArticleById, updateArticle } from "@/server/articles";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await currentUser())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const article = await getArticleById(id);
  if (!article) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ article });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await currentUser())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = await request.json().catch(() => ({}));

  try {
    await updateArticle(id, body);
  } catch {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  return NextResponse.json({ article: await getArticleById(id) });
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await currentUser())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await deleteArticle(id);
  return NextResponse.json({ ok: true });
}
