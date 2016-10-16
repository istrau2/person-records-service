/**
 * Created by istrauss on 10/16/2016.
 */

const {ModelsService} = require('../../services');
const modelsService = new ModelsService();

describe('ModelsService', () => {

    describe('get method', () => {

        beforeAll(() => {
            global.sails = {
                models: {
                    record: {
                        description: 'This is the records model.'
                    }
                }
            };
        });

        it('should return a sails model corresponding to modelName if it exists.', () => {
            const model = modelsService.get('Record');
            expect(model.description).toEqual('This is the records model.');
        });

        it('should throw if modelName is not of type string', () => {
            try {
                modelsService.get({});
            }
            catch(err) {
                expect(err.message).toEqual('modelName must be of type string.')
            }
        });

        it('should throw if correspondig model does not exist', () => {
            try {
                modelsService.get('nonExistingModel');
            }
            catch(err) {
                expect(err.message).toEqual('Could not find model: nonExistingModel')
            }
        });
    });
});
