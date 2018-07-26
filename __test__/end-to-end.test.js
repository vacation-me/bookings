import puppeteer from 'puppeteer';
const APP = 'http://localhost:3000';
let page;
let browser;
const width = 1920;
const height = 1080;

beforeAll(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.setViewport({ width, height });
});

afterAll((() => {
  browser.close();
}));


describe("Check in/Check out selection", async () => {
  beforeEach(async () => {
    await page.goto(APP, {waitUntil: 'networkidle2'});
    await page.click("#check-in");
  });
  
  test("intital buttons render correctly", async () => {
    const button = await page.$eval("#check-in", e => e.textContent);
    expect(button).toBe('Check-in');
  });

  test("Check-in renders to selected date after user input", async () => {
    await page.click("td.avail");
    const selectedCellDate = await page.$eval('.selected-date', e => +e.textContent);
    const checkInText = await page.$eval('#check-in', e => e.textContent);
    expect(checkInText.endsWith(`${selectedCellDate}/${new Date().getFullYear()}`)).toBe(true);
  });

  test("Check-out renders to selected date after user input", async () => {
    await page.click("td.avail");
    await page.click("td.avail");
    await page.click('#check-out');
    const checkOutDate = await page.$$eval('.selected-date', e => e[1].textContent); 
    const checkOutText = await page.$eval('#check-out', e => e.textContent);

    expect(checkOutText.endsWith(`${checkOutDate}/${new Date().getFullYear()}`)).toBe(true);
  });
});