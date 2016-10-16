/**
 * Created by istrauss on 10/15/2016.
 */

class ModelsService {

    /**
     * Obtains the model corresponding to modelName
     * @param modelName string
     * @returns {Object}
     */
    get(modelName) {
        if (typeof modelName !== 'string') {
            throw new Error('modelName must be of type string.');
        }

        const model =  sails.models[modelName.toLowerCase()];

        if (!model) {
            throw new Error('Could not find model: ' + modelName);
        }

        return model;
    }
}

module.exports = ModelsService;
