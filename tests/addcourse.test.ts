import { Builder, By, until } from 'selenium-webdriver';

let driver;
const baseUrl = 'https://se-student-management-system-gig6.onrender.com/';
const email = 'anurinstructor@gmail.com';
const password = 'sifra123';
const courseName = 'testcourse123';

beforeAll(async () => {
  driver = await new Builder().forBrowser('chrome').build();
  await driver.get(baseUrl + '#login');
  await driver.manage().window().maximize();

  // Wait for the login page to load
  await driver.wait(until.elementLocated(By.id('email')), 10000);

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

  // Click the dashboard button in the navbar to navigate to the dashboard
  const dashboardButton = await driver.findElement(By.xpath('//*[@id="navbarNav"]/ul/li[3]/a'));
  await dashboardButton.click();

  // Wait for the page to redirect or update after login
  await driver.wait(until.urlContains('#dashboard'), 20000);
}, 15000);

test('Create a new course', async () => {
  await driver.get(baseUrl + '#dashboard');

  // Scroll to the bottom of the page
  await driver.executeScript("window.scrollTo(0, document.body.scrollHeight);");
  await driver.sleep(1000); // Wait for the scroll to complete

  // Wait for the add course button to load and click it
  const addCourseButton = await driver.findElement(By.id('addCourseButton'));
  await driver.wait(until.elementIsVisible(addCourseButton), 10000);
  await addCourseButton.click();

  // Wait for the create course form to load
  await driver.wait(until.elementLocated(By.id('courseTitle')), 10000);

  // Fill in the course creation form
  const courseTitleField = await driver.findElement(By.id('courseTitle'));
  await courseTitleField.sendKeys(courseName);

  // Scroll to the bottom of the page
  await driver.executeScript("window.scrollTo(0, document.body.scrollHeight);");
  await driver.sleep(1000); // Wait for the scroll to complete

  // Find the create course button and click it
  const createCourseButton = await driver.findElement(By.xpath('/html/body/section/main/section[3]/div/div[3]/div/div/div/div[2]/form/button'));
  await createCourseButton.click();

  // Handle successful course creation alert
  try {
    await driver.wait(until.alertIsPresent(), 20000);
    let alert = await driver.switchTo().alert();
    await alert.accept();
  } catch (error) {
    console.log('No alert appeared after course creation.');
  }

  // Wait for 2-3 seconds to ensure the creation is processed
  await driver.sleep(3000);

  // No further checks needed, test passes if execution reaches this point
}, 30000);

afterAll(async () => {
  await driver.quit();
});