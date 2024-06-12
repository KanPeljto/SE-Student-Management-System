import { Builder, By, until } from 'selenium-webdriver';

let driver;
const baseUrl = 'http://localhost/OLP/SE-Student-Management-System/index.html';

beforeAll(async () => {
  driver = await new Builder().forBrowser('chrome').build();
  await driver.get(baseUrl + '#login');
  await driver.manage().window().maximize();
}, 15000);

test('Test 1 - Title Verification', async () => {
  let title = await driver.getTitle();
  expect(title).toBe('Student Management System');
});

test('Check get_courses.php returns 200', async () => {
  await driver.get(baseUrl + '#home');
  
  // Wait for the featured courses to load
  await driver.wait(until.elementLocated(By.id('featuredCourses')), 10000);

  // Execute JavaScript in the browser context to make an XMLHttpRequest
  const statusCode = await driver.executeAsyncScript((callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost/OLP/SE-Student-Management-System/rest/routes/Course/get_courses.php', true);
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

test('Login with john.doe@example.com and password 1', async () => {
  await driver.get(baseUrl + '#login');

  // Find the email and password fields and the login button
  const emailField = await driver.findElement(By.id('email'));
  const passwordField = await driver.findElement(By.id('password'));
  const loginButton = await driver.findElement(By.css('button[type="submit"]'));

  // Enter email and password
  await emailField.sendKeys('john.doe@example.com');
  await passwordField.sendKeys('password1');

  // Click the login button
  await loginButton.click();

  // Wait for the page to redirect or update after login
  await driver.wait(until.urlContains('#dashboard'), 10000);

  // Verify successful login by checking the new URL
  const currentUrl = await driver.getCurrentUrl();
  expect(currentUrl).toContain('#dashboard');
}, 30000);  // Increased timeout to 30 seconds for login process

afterAll(async () => {
  await driver.sleep(3000);
  await driver.quit();
});