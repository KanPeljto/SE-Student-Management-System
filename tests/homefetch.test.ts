import { Builder, By, until } from 'selenium-webdriver';

let driver;
const url = 'http://localhost/SE-Student-Management-System/index.html#home';

beforeAll(async () => {
  driver = await new Builder().forBrowser('chrome').build();
  await driver.get(url);
  await driver.manage().window().maximize();
}, 15000);

test('Test 1', async () => {
  let title = await driver.getTitle();
  expect(title).toBe('Student Management System');
});

test('Check get_courses.php returns 200', async () => {
  // Wait for the featured courses to load
  await driver.wait(until.elementLocated(By.id('featuredCourses')), 10000);

  // Execute JavaScript in the browser context to make an XMLHttpRequest
  const statusCode = await driver.executeAsyncScript((callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost/SE-Student-Management-System/rest/routes/Course/get_courses.php', true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        callback(xhr.status);
      }
    };
    xhr.onerror = function() {
      callback(0); // Callback with 0 to indicate an error
    };
    xhr.ontimeout = function() {
      callback(0); // Callback with 0 to indicate a timeout
    };
    xhr.send();
  });

  // Check that the status code is 200
  expect(statusCode).toBe(200);
}, 45000);  // Increased timeout to 45 seconds

afterAll(async () => {
  await driver.sleep(3000);
  await driver.quit();
});