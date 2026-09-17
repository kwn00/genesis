"use client";

import { type FormEvent, useState } from "react";
import type { Item } from "@/lib/example-items";

export function ItemInbox({ initialItems }: { initialItems: Item[] }) {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [title, setTitle] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch("/api/example/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    if (!response.ok) {
      return;
    }
    const data = (await response.json()) as { item: Item };
    setItems((current) => [data.item, ...current]);
    setTitle("");
  }

  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-8 px-6 py-16">
      <header className="flex flex-col gap-2">
        <p className="text-sm text-zinc-500">Genesis 예시</p>
        <h1 className="text-3xl font-semibold tracking-tight">아이템 인박스</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          더미 아이템을 보고, 제목을 입력해 맨 위에 추가한다.
        </p>
      </header>
      <form className="flex flex-col gap-3 sm:flex-row" onSubmit={onSubmit}>
        <label className="flex min-w-0 flex-1 flex-col gap-1 text-sm">
          제목
          <input
            className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-base text-zinc-950 outline-none focus:border-zinc-950 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-50"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </label>
        <button
          className="self-end rounded-md bg-zinc-950 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-50 dark:text-zinc-950"
          type="submit"
        >
          추가
        </button>
      </form>
      <p className="text-sm text-zinc-500">아이템 {items.length}개</p>
      <ul className="flex flex-col divide-y divide-zinc-200 dark:divide-zinc-800">
        {items.map((item) => (
          <li className="py-3 text-lg" key={item.id}>
            {item.title}
          </li>
        ))}
      </ul>
    </main>
  );
}
