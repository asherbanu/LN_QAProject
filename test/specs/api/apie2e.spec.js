import { expect } from 'chai';
import env from '../../../config/env/envLoader.js';
import testData from '../../../resources/apiTestData.json' with { type: 'json' };

describe('Restful Booker API Automation', () => {

    let bookingId, authToken;
    const baseUrl = env.BASE_API_URL;

    before(async () => {
        const authTokenResponse = await fetch(`${baseUrl}/auth`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(testData.auth)
        });
        const authTokenBody = await authTokenResponse.json();
        authToken = authTokenBody.token;
    });

    it('TC-API-001 - Create Booking (positive)', async () => {
        const bookingPayload = testData.booking.create;

        const createResponse = await fetch(`${baseUrl}/booking`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(bookingPayload)
        });

        const responseBody = await createResponse.json();
        expect(createResponse.status).to.equal(200);
        expect(responseBody).to.have.property('bookingid');

        expect(responseBody.booking).to.have.property('firstname', bookingPayload.firstname);
        expect(responseBody.booking).to.have.property('lastname', bookingPayload.lastname);
        expect(responseBody.booking).to.have.property('totalprice', bookingPayload.totalprice);
        expect(responseBody.booking).to.have.property('depositpaid', bookingPayload.depositpaid);
        expect(responseBody.booking.bookingdates).to.have.property('checkin', bookingPayload.bookingdates.checkin);
        expect(responseBody.booking.bookingdates).to.have.property('checkout', bookingPayload.bookingdates.checkout);
        expect(responseBody.booking).to.have.property('additionalneeds', bookingPayload.additionalneeds);

        bookingId = responseBody.bookingid;
    });

    it('TC-API-002 - Get Booking (positive)', async () => {
        const getResponse = await fetch(`${baseUrl}/booking/${bookingId}`);
        const responseBody = await getResponse.json();

        expect(getResponse.status).to.equal(200);
        expect(responseBody).to.have.property('firstname', testData.booking.create.firstname);
        expect(responseBody).to.have.property('lastname', testData.booking.create.lastname);
        expect(responseBody).to.have.property('totalprice', testData.booking.create.totalprice);
        expect(responseBody.bookingdates).to.have.property('checkin', testData.booking.create.bookingdates.checkin);
    });

    it('TC-API-003 - Update Booking (positive with auth)', async () => {
        const updatePayload = testData.booking.update;

        const updateResponse = await fetch(`${baseUrl}/booking/${bookingId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': `token=${authToken}`
            },
            body: JSON.stringify(updatePayload)
        });
        const responseBody = await updateResponse.json();
        
        expect(updateResponse.status).to.equal(200);
        expect(responseBody.firstname).to.equal(updatePayload.firstname);
        expect(responseBody.totalprice).to.equal(updatePayload.totalprice);
        expect(responseBody.additionalneeds).to.equal(updatePayload.additionalneeds);
    });

    it('TC-API-004 - Update Booking (negative without auth)', async () => {
        const updateResponse = await fetch(`${baseUrl}/booking/${bookingId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({})
        });

        expect([403, 401]).to.include(updateResponse.status);
    });

    it('TC-API-005 - Delete Booking (positive with auth)', async () => {
        const deleteResponse = await fetch(`${baseUrl}/booking/${bookingId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `token=${authToken}`
            }
        });
        expect(deleteResponse.status).to.equal(201);

        const verificationResponse = await fetch(`${baseUrl}/booking/${bookingId}`);
        expect(verificationResponse.status).to.equal(404);
    });

    it('TC-API-006 - Delete Booking (negative without auth)', async () => {
        const deleteResponse = await fetch(`${baseUrl}/booking/${bookingId}`, {
            method: 'DELETE'
        });

        expect([403, 405]).to.include(deleteResponse.status);
    });

    it('TC-API-007 - Get Booking (negative invalid ID)', async () => {
        const getResponse = await fetch(`${baseUrl}/booking/999999999`);
        expect(getResponse.status).to.equal(404);
    });

});
