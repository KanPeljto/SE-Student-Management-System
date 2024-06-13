import { Builder, WebDriver } from "selenium-webdriver";
import * as chrome from "selenium-webdriver/chrome";


let driver;


export async function createDriver(url : string) {
    const chromeOptions = new chrome.Options();
    driver = await new Builder().forBrowser("chrome").setChromeOptions(chromeOptions).build();
    await driver.get(url);
    await driver.manage().window().maximize();
    await driver.manage().setTimeouts({ implicit: 15000 });
    return driver;
}


export async function quitDriver(driver: WebDriver) {
    await driver.quit();
}
