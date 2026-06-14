# Assignment

A comprehensive WebdriverIO automation test suite for Cheapflights flight search functionality and Restful Booker API testing.

## Project Overview

This project contains:
- **UI Automation Tests**: Flight search workflow automation using Page Object Model
- **API Automation Tests**: RESTful API testing for booking operations
- **Environment Configuration**: Multi-environment setup (QA, UAT, Production)
- **Test Data Management**: Centralized test data in JSON format
- **Allure Reporting**: Detailed test execution reports

## Project Structure

```
├── test/
│   ├── specs/
│   │   ├── ui/
│   │   │   └── uie2e.spec.js (UI end-to-end tests)
│   │   └── api/
│   │       └── apie2e.spec.js (API end-to-end tests)
│   └── pageobjects/
│       ├── SearchFlight.page.js (Flight search page object)
│       ├── Home.page.js (Home page object)
│       └── page.js (Base page class)
├── config/
│   └── env/
│       ├── envLoader.js (Environment loader)
│       ├── qa.env.js (QA configuration)
│       ├── uat.env.js (UAT configuration)
│       └── prod.env.js (Production configuration)
├── resources/
│   ├── apiTestData.json (API test data)
│   └── uitestdata.json (UI test data)
├── results/
│   ├── allure-results/ (Test results)
│   └── allure-report/ (Generated reports)
├── wdio.conf.js (WebdriverIO configuration)
├── package.json (Project dependencies)
└── README.md (This file)
```

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- Chrome browser (v149 or higher)

## Installation

1. Clone or extract the project
2. Navigate to project directory:
   ```bash
   cd com.cheapflight.au_WDIO-main
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

Environment variables are managed in `config/env/`:

- **qa.env.js**: QA environment settings
- **uat.env.js**: UAT environment settings
- **prod.env.js**: Production environment settings

Default environment is QA. Each environment file contains:
- `BASE_URL`: Application URL
- `BASE_API_URL`: API base URL
- `BROWSER`: Browser type (default: chrome)
- `MAX_INSTANCES`: Parallel test instances
- `WAITFOR_TIMEOUT`: Element wait timeout
- `CONNECTION_RETRY_TIMEOUT`: Connection retry timeout

## Running Tests

### Run UI Tests
```bash
npm run test:web
```

### Run API Tests
```bash
npm run test:api
```

### Generate Allure Report
```bash
npm run report:generate
```

### Open Allure Report
```bash
npm run report:open
```

## Test Cases

### UI E2E Tests (3 test cases)
- **TC-WEB-001/TC-WEB-002**: Logo and login button visibility
- **TC-WEB-003**: Complete flight search workflow with assertions
- **TC-WEB-004**: Validation for empty mandatory fields

### API E2E Tests (7 test cases)
- **TC-API-001**: Create booking (positive)
- **TC-API-002**: Get booking (positive)
- **TC-API-003**: Update booking with authentication (positive)
- **TC-API-004**: Update booking without authentication (negative)
- **TC-API-005**: Delete booking with authentication (positive)
- **TC-API-006**: Delete booking without authentication (negative)
- **TC-API-007**: Get booking with invalid ID (negative)

## Test Data

### UI Test Data (uitestdata.json)
- Flight search parameters (departure, destination, date)
- Expected assertions

### API Test Data (apiTestData.json)
- Authentication credentials
- Booking creation payload
- Booking update payload

## Naming Conventions

### Page Object Getters
- Semantic naming for clarity (e.g., `departureLocation`, `destinationLocation`)
- Plural names for collections (e.g., `calendarDays`, `alertErrorMessages`)
- Action-specific names (e.g., `compareFlightsCheckbox`)

### Test Variables
- Specific response names by action (e.g., `createResponse`, `updateResponse`, `deleteResponse`)
- Context-aware payloads (e.g., `bookingPayload`, `updatePayload`)
- Clear body references (e.g., `responseBody`, `authTokenBody`)

## Reporting

Test reports are generated in Allure format and stored in:
- **Test Results**: `results/allure-results/`
- **Generated Report**: `results/allure-report/`

Reports include:
- Test execution status
- Pass/fail details
- Screenshots on failure
- Execution timeline
- Test categorization

## Error Handling

- Failed tests automatically capture screenshots to `results/allure-results/`
- Comprehensive error messages logged for debugging
- Validation checks with meaningful assertions

## Troubleshooting

### Tests not running
- Ensure Chrome is installed and up to date
- Check environment variables in config/env files
- Verify test data JSON files are valid

### Allure report not generating
- Ensure allure-report package is installed
- Check results/allure-results/ directory exists
- Run: `npm run report:generate`

### Browser connection issues
- Increase CONNECTION_RETRY_TIMEOUT in config
- Check if Chrome is running or blocked by antivirus

## Version Information

- WebdriverIO: v9.27.1
- Mocha: v6.2.2
- Chai: v6.2.2
- Allure Reporter: Latest
- Chrome: v149+

## License

This project is part of an assignment for automation testing.
