import { Builder, By } from "selenium-webdriver";
let driver;
let url = 'http://localhost/OLP/SE-Student-Management-System/index.html#home';


beforeAll(async () => {
  driver = await new Builder().forBrowser("chrome").build();
  await driver.get(url);
  await driver.manage().window().maximize();
},15000);



test("Test 1", async () => {
  let title = await driver.getTitle();
  expect(title).toBe("Student Management System");
})


afterAll(async () => {
    await driver.sleep(3000);
    await driver.quit();
});