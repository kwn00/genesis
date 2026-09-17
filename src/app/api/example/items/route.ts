import { addItem, listItems } from "@/lib/example-items";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ items: listItems() });
}

export async function POST(request: Request) {
  const body: unknown = await request.json();
  const title = readTitle(body);

  if (title === undefined) {
    return NextResponse.json({ error: "title required" }, { status: 400 });
  }

  return NextResponse.json({ item: addItem(title) }, { status: 201 });
}

function readTitle(body: unknown): string | undefined {
  if (typeof body !== "object" || body === null || !("title" in body)) {
    return undefined;
  }

  const title = body.title;
  if (typeof title !== "string" || title.trim() === "") {
    return undefined;
  }

  return title;
}
