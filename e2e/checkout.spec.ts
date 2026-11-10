import { test, expect } from "@playwright/test";

test("checkout is loaded with emoty list", async ({ page }) => {
  await page.goto("/checkout");

  await expect(
    page.getByRole("heading", {
      name: /Complete Your Order/i,
    }),
  ).toBeVisible();

  await expect(page.getByText(/No items added to the cart/i)).toBeVisible();
});

test("checkout is loaded with items", async ({ page }) => {
  await page.goto("/products/1");

  await page
    .getByRole("button", {
      name: /Add to cart/i,
    })
    .click();

  await page
    .getByRole("link", {
      name: /Go to checkout page/i,
    })
    .click();

  await expect(page.getByText(/No items added to the cart/i)).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: /Remove from cart/i }),
  ).toBeVisible();
});
