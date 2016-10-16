/**
 * Created by istrauss on 10/16/2016.
 */

const Promise = require('bluebird');

class MockRecordService {

    getOrderedList(orderBy, direction = 'ASC') {
        return Promise.resolve([]);
    }

    createDBRecordsFromLines(lines) {
        return Promise.resolve([
            {
                name: 'mockRecord'
            }
        ]);
    }
}

module.exports = MockRecordService;
