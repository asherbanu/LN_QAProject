import { $ } from '@wdio/globals'
import Page from './page.js' 

class SearchFlightPage extends Page{
    get tripTypeSelector () {
        return $('//div[@aria-label="Trip type Return"]')
    }
    get selectOneWayTrip () {
        return $('//li[@aria-label="One-way"]')
    }
    get clearDestinationInput () {
        return $('//div[@aria-label="Remove value"]')
    }
    get departureLocation () {
        return $('//input[@aria-label="Origin location"]')
    }
    get destinationLocation () {
        return $('//input[@aria-label="Destination location"]')
    }
    
    get departureDatePicker () {
        return $('//span[contains(text(), "Departure")]')
    }
    get monthYearDisplay () {
        return $('//caption[@class="w0lb w0lb-month-name w0lb-mod-align-center"]')
    }

    get nextMonth () {
        return $('//div[@aria-label="Next month"]')
    }
    get calendarDays () {
        return $$('//div[@class="vn3g-button"]')
    }

    get compareFlightsCheckbox () {
        return $('//input[@class="dX-j-input"]')
    }
    get btnSearch () {
        return $('button[type="submit"]')
    }

    get cheapestFlightsTab () {
        return $('//div[@aria-label="Cheapest"]')
    }

     get flightResults () {
        return $$('//div[@class="oVHK"]//span') 
    }

    //Flight Assertion locators
    get flightSummary () {
        return $('//div[@class="MZCS-details-summary-header"]//h2')
    }
    get alertErrorMessages () {
        return $$('li[role="alert"]')
    }
    get routeDisplay () {
        return $('//div[contains(@class,"info-column")]//span[1]')
    }
    get departureDate () {
        return $('//div[contains(@class,"info-column")]//span[2]')
    }
    get flightStopsAndDuration () {
        return $('//div[contains(@class,"info-column")]//div[contains(@class,"sub-title")]')
    }

    open () {
        return super.open('/')
    }
}
export default new SearchFlightPage()
