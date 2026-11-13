
const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function testRegistration() {

    let options = new chrome.Options();

    // Use Brave browser
    options.setChromeBinaryPath(
        'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe'
    );

    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {

        await driver.get(
            'file:///' + __dirname.replace(/\\/g, '/') + '/index.html'
        );

        let title = await driver.getTitle();

        if (title === 'User Registration') {
            console.log('TC1: Page Title - PASS');
        }

        await driver.findElement(By.id('name'))
            .sendKeys('meow');

        await driver.findElement(By.id('email'))
            .sendKeys('meowy@gmail.com');

        await driver.findElement(By.id('password'))
            .sendKeys('123456');

        console.log('TC2: Enter Details - PASS');

        await driver.findElement(By.css('button')).click();

        let message = await driver.findElement(By.id('message'))
            .getText();

        if (message === 'Registration Successful!') {
            console.log('TC3: Registration - PASS');
        }

    } finally {
        await driver.quit();
    }
}

testRegistration().catch(console.error);
