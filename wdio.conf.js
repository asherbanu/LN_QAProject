import env from './config/env/envLoader.js'

export const config = {
    runner: 'local',
    specs: ['./test/specs/**/*.js'],
    maxInstances: env.MAX_INSTANCES,
    capabilities: [{
        browserName: env.BROWSER,
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
            args: [
                '--start-maximized',
                '--no-sandbox',
                '--disable-infobars',
                '--disable-gpu',
                '--disable-dev-shm-usage'
            ]
        }
    }],
    logLevel: 'info',
    baseUrl: env.BASE_URL,
    waitforTimeout: env.WAITFOR_TIMEOUT,
    connectionRetryTimeout: env.CONNECTION_RETRY_TIMEOUT,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'results/allure-results',
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false
        }]
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 120000
    },
    afterTest: async function (test, context, { error, result, duration, passed }) {
        if (!passed) {
            await browser.saveScreenshot(`./ScreenShots/${test.title}.png`)
        }
    }
}
