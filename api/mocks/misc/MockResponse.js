/**
 * Created by istrauss on 10/16/2016.
 */

class MockResponse {
    ok(data) {
        return data;
    }

    badRequest(data) {
        return data;
    }

    serverError(data) {
        return data;
    }
}

module.exports = MockResponse;
