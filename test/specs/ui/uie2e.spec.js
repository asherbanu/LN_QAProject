import { browser } from '@wdio/globals'
import HomePage from '../../pageobjects/Home.page.js'
import SearchFlightPage from '../../pageobjects/SearchFlight.page.js'
import { expect } from 'chai'
import testData from '../../../resources/uitestdata.json' with { type: 'json' }

const { fromLocation, toLocation, travelDateYear, travelDateMonth, travelDateDay } = testData.flight;
const expectedFlightDetails = testData.expectedFlightDetails;

describe('Cheapflights Search - Web Automation', () => {
   
    beforeEach(async () => {
        // 1. Navigate to the page first to establish origin
        await HomePage.open();

        // 2. Clear state while on the domain to avoid SecurityErrors
        await browser.deleteCookies();
        await browser.execute(() => {
            localStorage.clear();
            sessionStorage.clear();
        });

        // 3. Refresh and maximize to start clean
        await browser.refresh();
        await browser.maximizeWindow();

        // 4. Stabilize
        await SearchFlightPage.btnSearch.waitForDisplayed({ timeout: 30000 });
    });

    it('TC-WEB-001/TC-WEB-002 - Logo + Login button displayed', async () => {
        const logo = HomePage.logoOnHomepage;
        const login = HomePage.loginElement;

        await logo.waitForDisplayed({ timeout: 10000 });
        await login.waitForDisplayed({ timeout: 10000 });
    })

    it('TC-WEB-003 - Search flights using valid From/To (positive)', async () => {
        await SearchFlightPage.tripTypeSelector.click()
        await SearchFlightPage.selectOneWayTrip.click()
        await SearchFlightPage.clearDestinationInput.click()
        
        await SearchFlightPage.departureLocation.setValue(fromLocation)
        await browser.pause(3000)
        await browser.keys('Enter')
    
        await SearchFlightPage.destinationLocation.setValue(toLocation)
        await browser.pause(3000)
        await browser.keys('Enter')
    
        const targetMonth = travelDateMonth
        const targetYear = travelDateYear
        const targetDay = travelDateDay
        
        await SearchFlightPage.departureDatePicker.click()
        let monthFound = false
        for (let i = 0; i < 24; i++) {
            const monthYear = await SearchFlightPage.monthYearDisplay.getText()
            if (monthYear.includes(targetMonth) && monthYear.includes(targetYear)) {
                monthFound = true
                break
            }
            await SearchFlightPage.nextMonth.click()
        }
        
        const allDates = await SearchFlightPage.calendarDays
        for (const date of allDates) {
            const text = await date.getText()
            if (text === targetDay) {
                await date.click()
                break
            }
        }
        await browser.pause(3000)
        await SearchFlightPage.compareFlightsCheckbox.click()
        await SearchFlightPage.btnSearch.click()
    
        const actualTitle = await browser.getTitle()
        const monthMap = {
            January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
            July: 7, August: 8, September: 9, October: 10, November: 11, December: 12
        }
        const monthNumber = monthMap[targetMonth]
        const expectedTitle = `${fromLocation} to ${toLocation}, ${targetDay}/${monthNumber}`
        console.log(`Expected: ${expectedTitle}`)
        console.log(`Actual: ${actualTitle}`)
        
        expect(actualTitle).to.contain(expectedTitle) 

        await SearchFlightPage.cheapestFlightsTab.waitForClickable({timeout: 10000})
        await SearchFlightPage.cheapestFlightsTab.click()
        
        const flightResults = await SearchFlightPage.flightResults
        expect(flightResults).to.have.lengthOf.at.least(1)
        
        await browser.pause(3000)
        await flightResults[0].click()

        const flightSummary = await SearchFlightPage.flightSummary
        await flightSummary.waitForDisplayed({timeout: 5000})
        expect(await flightSummary.getText()).to.equal(expectedFlightDetails)
        
        const routeDisplay = await SearchFlightPage.routeDisplay
        await routeDisplay.waitForDisplayed({timeout: 5000})
        const routeText = await routeDisplay.getText()
        expect(routeText.replaceAll('→', 'to')).to.equal(`${fromLocation} to ${toLocation}`)
        
        const departureDateElement = await SearchFlightPage.departureDate
        await departureDateElement.waitForDisplayed({timeout: 5000})
        const departureDate = await departureDateElement.getText()
        const formattedDate = departureDate.replace(/^[A-Za-z]{3},\s*/, '')
        expect(formattedDate).to.equal(`${targetDay} ${targetMonth.substring(0, 3)}`)
        
        const flightStopsAndDuration = await SearchFlightPage.flightStopsAndDuration
        await flightStopsAndDuration.waitForDisplayed({timeout: 5000})
    })

    it('TC-WEB-004 - Validate search validation when mandatory fields are empty', async () => {
        // Ensure the button is clickable after the fresh relaunch.
           await SearchFlightPage.tripTypeSelector.click()
        await SearchFlightPage.selectOneWayTrip.click()
        await SearchFlightPage.clearDestinationInput.click()
        await SearchFlightPage.btnSearch.waitForClickable({ timeout: 10000 });
        await SearchFlightPage.btnSearch.click();
        await browser.waitUntil(async () => {
            const errors = await SearchFlightPage.alertErrorMessages;
            return errors.length > 0;
        }, { timeout: 10000, timeoutMsg: 'Validation errors did not appear after clicking Search' });

        const errorList = await SearchFlightPage.alertErrorMessages;
        expect(errorList.length).to.be.at.least(1, 'At least one validation message should be visible');
    });
})