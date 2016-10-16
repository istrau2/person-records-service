/**
 * Created by istrauss on 10/15/2016.
 */

class ModelsService {
    get(modelName) {
        const model =  sails.models[modelName.toLowerCase()];

        if (!model) {
            throw new Error('Could not find model: ' + modelName);
        }

        return model;
    }
}

module.exports = ModelsService;
