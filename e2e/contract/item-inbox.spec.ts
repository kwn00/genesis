import { expect, test } from "@playwright/test";

test("새 아이템을 추가하면 목록 맨 위에 나타난다", async ({ page }) => {
  await test.step("Given /example 페이지에 접속한다", async () => {
    await page.goto("/example");
  });

  await test.step("Then 시드 아이템 Alpha가 보인다", async () => {
    await expect(page.getByRole("listitem").filter({ hasText: "Alpha" })).toBeVisible();
  });

  await test.step("When 제목 Gamma를 입력하고 추가한다", async () => {
    await page.getByLabel("제목").fill("Gamma");
    await page.getByRole("button", { name: "추가" }).click();
  });

  await test.step("Then 목록 맨 위에 Gamma가 보인다", async () => {
    await expect(page.getByRole("listitem").first()).toHaveText("Gamma");
  });
});
