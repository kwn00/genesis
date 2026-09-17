import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-6 px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Genesis</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        기획서가 입력이고, 계약 테스트가 진실이다. 첫 기능이 이 홈을 대체한다.
      </p>
      <Link className="text-sm underline underline-offset-4" href="/example">
        예시: 아이템 인박스 →
      </Link>
    </main>
  );
}
