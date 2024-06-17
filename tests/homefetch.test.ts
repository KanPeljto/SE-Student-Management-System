import { Builder, By, until } from 'selenium-webdriver';

let driver;
const url = 'https://se-student-management-system-gig6.onrender.com/';
const email = 'selver@ses.com';
const password = 'selmabajrami';

beforeAll(async () => {
  driver = await new Builder().forBrowser('chrome').build();
  await driver.get(url + '#login');
  await driver.manage().window().maximize();

  // Perform login
  const emailField = await driver.findElement(By.id('email'));
  const passwordField = await driver.findElement(By.id('password'));
  const loginButton = await driver.findElement(By.css('button[type="submit"]'));

  await emailField.clear();
  await emailField.sendKeys(email);
  await passwordField.clear();
  await passwordField.sendKeys(password);
  await loginButton.click();

  // Handle successful login alert
  try {
    await driver.wait(until.alertIsPresent(), 20000);
    let alert = await driver.switchTo().alert();
    await alert.accept();
  } catch (error) {
    console.log('No alert appeared after login.');
  }

  // Wait for the page to redirect or update after login
  await driver.wait(until.urlContains('#home'), 20000);
}, 15000);

test('Test 1 - Title Verification', async () => {
  let title = await driver.getTitle();
  expect(title).toBe('Student Management System');
});

test('Check get_courses.php returns 200', async () => {
  await driver.get(url + '#home');

  // Wait for the featured courses to load
  await driver.wait(until.elementLocated(By.id('featuredCourses')), 10000);

  // Execute JavaScript in the browser context to make an XMLHttpRequest
  const statusCode = await driver.executeAsyncScript((callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://se-student-management-system-gig6.onrender.com/rest/routes/Course/get_courses.php', true);
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