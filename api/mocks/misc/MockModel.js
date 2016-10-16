/**
 * Created by istrauss on 10/16/2016.
 */

class MockModel {

    data = [];

    create(newEntities) {
        const _this = this;
        return {
            exec(cb) {
                _this.data.push(newEntities);
                cb(null, newEntities);
            }
        };
    }

    find(options) {
        return {
            exec(cb) {
                cb(null, this.data);
            }
        };
    }
}

module.exports = MockModel;
