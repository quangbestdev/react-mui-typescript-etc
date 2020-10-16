import { Browser, Page } from "playwright";
import qawolf from "qawolf";

let browser: Browser;
let page: Page;

beforeAll(async () => {
  browser = await qawolf.launch();
  const context = await browser.newContext();
  await qawolf.register(context);
  page = await context.newPage();
});

afterAll(async () => {
  await qawolf.stopVideos();
  await browser.close();
});

test("sanity", async () => {
  await page.goto("http://localhost:3000/");

  // In home, proceed to shop page
  await page.click('[aria-label="open drawer"]');
  await page.click("text=Shop");
  await page.click("text=All Skincare Products");
});
