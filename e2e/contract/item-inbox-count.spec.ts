import { expect, test } from "@playwright/test";

const countPattern = /아이템 (\d+)개/;

test("아이템을 추가하면 개수가 하나 늘어난다", async ({ page }) => {
  const count = page.getByText(countPattern);
  let before = 0;

  await test.step("Given /example 페이지에 접속한다", async () => {
    await page.goto("/example");
  });

  await test.step("Then 아이템 N개 형식의 개수가 보인다", async () => {
    await expect(count).toBeVisible();
    before = Number(countPattern.exec((await count.textContent()) ?? "")?.[1]);
    expect(before).toBeGreaterThan(0);
  });

  await test.step("When 제목을 입력하고 추가한다", async () => {
    await page.getByLabel("제목").fill(`Delta-${Date.now()}`);
    await page.getByRole("button", { name: "추가" }).click();
  });

  await test.step("Then 개수가 N+1로 바뀐다", async () => {
    await expect(count).toHaveText(`아이템 ${before + 1}개`);
  });
});
