const puppeteer = require("puppeteer");
const screenshotPath = "puppeteer/screenshots/";

let browser;
let page;
let i = 1;

beforeAll(async () => {
    browser = await puppeteer.launch({
        headless: false,
        devtools: true
    });
    page = await browser.newPage();
    await page.goto(
        URL, { waitUntil: "domcontentloaded" }
    );
    await page.screenshot({ path: 'Bookshop.png' });


});

afterEach(async () => {
    await page.screenshot({ path: screenshotPath + (++i) + 'Bookshop.png' });
});

describe("Bookshop Tests", () => {
    it('Check if Title is Capire Books', async () => {
        const sTitle = await page.$eval('#app >h1', el => el.innerText);
        expect(sTitle).toBe('Capire Books');
    });

    it('Should return correct results on Filter', async () => {
        const sSearchString = "Bront";
        await page.type(`input[type="text"]`, sSearchString);
        const result = await page.$('#app #books tbody tr');
        const aData = await page.$$eval('#app #books tbody tr', trs => trs.map((tr) => {
            return tr.innerText;
        }));
        console.log(aData);
        const bCorrectResults =  aData.every((val) => val.includes(sSearchString));
        expect(bCorrectResults).toBe(true);
     });

})


afterAll(async () => {
    browser.close()
});


