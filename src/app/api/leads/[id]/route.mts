import { NextResponse } from "next/server";
import { currentUser } from "@/server/auth";
import { deleteLead, isLeadStatus, setLeadStatus } from "@/server/leads";

/** Reading and changing a lead is Studio-only; only POST /api/leads is public. */
type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  if (!(await currentUser())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => ({}));

  if (!isLeadStatus(body?.status)) {
    return NextResponse.json({ error: "status tidak dikenal" }, { status: 400 });
  }

  await setLeadStatus(id, body.status);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: Request, { params }: Params) {
  if (!(await currentUser())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await deleteLead(id);
  return NextResponse.json({ ok: true });
}
