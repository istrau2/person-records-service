/**
 * Created by istrauss on 10/16/2016.
 */

const MockModel = require('../misc/MockModel');

class MockModelsService {

    models = {};

    get(modelName) {
        if (!this.models[modelName]) {
            this.models[modelName] = new MockModel();
        }

        return this.models[modelName];
    }
}

module.exports = MockModelsService;
