import { Builder, By, until } from 'selenium-webdriver';

let driver;
const baseUrl = 'http://localhost/OLP/SE-Student-Management-System/index.html';

beforeAll(async () => {
  driver = await new Builder().forBrowser('chrome').build();
  await driver.get(baseUrl + '#dashboard');
  await driver.manage().window().maximize();
}, 15000);

test('Click delete button and wait', async () => {
  await driver.get(baseUrl + '#dashboard');

  // Wait for the courses to load
  await driver.wait(until.elementLocated(By.id('courseList')), 10000);

  // Find the delete button using the full XPath
  const deleteButton = await driver.findElement(By.xpath('/html/body/section/main/section[3]/div/div[1]/div/div[2]/div/div/div/button[2]'));

  await driver.sleep(3000);

  // Click the delete button
  await deleteButton.click();

  // Wait for 2-3 seconds
  await driver.sleep(3000);

  // No further checks needed, test passes if execution reaches this point
}, 30000);

afterAll(async () => {
  await driver.quit();
});