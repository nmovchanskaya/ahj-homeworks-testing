import { fork } from 'child_process';
import puppetteer from 'puppeteer';

jest.setTimeout(30000); // default puppeteer timeout

describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({headless: "new"});
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('valid visa', async () => {
    await page.goto(baseUrl);
    await page.waitForSelector('.form__validate');

    const form = await page.$('.form__validate');
    const input = await form.$('.input');
    const button = await form.$('.button');

    await input.type('4444123412341234');
    await button.click();
    await page.screenshot({path: './screenshot.png'});

    await page.waitForSelector('.active > .visa');
  });

  test('valid mir', async () => {
    await page.goto(baseUrl);
    await page.waitForSelector('.form__validate');

    const form = await page.$('.form__validate');
    const input = await form.$('.input');
    const button = await form.$('.button');

    await input.type('2000123412341234');
    await button.click();

    await page.waitForSelector('.active > .mir');
  });

  test('valid mastercard', async () => {
    await page.goto(baseUrl);
    await page.waitForSelector('.form__validate');

    const form = await page.$('.form__validate');
    const input = await form.$('.input');
    const button = await form.$('.button');

    await input.type('5252123412341234');
    await button.click();

    await page.waitForSelector('.active > .mastercard');
  });

  test('invalid card number', async () => {
    await page.goto(baseUrl);
    await page.waitForSelector('.form__validate');

    const form = await page.$('.form__validate');
    const input = await form.$('.input');
    const button = await form.$('.button');

    await input.type('1234');
    await button.click();

    await page.waitForSelector('.message');
    const message = await page.$('.message');
    const text = await message.evaluate((el) => el.textContent);
    expect(text).toBe('Invalid card number');
  });
});
