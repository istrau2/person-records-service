/**
 * Created by istrauss on 10/15/2016.
 */

const {inject, Container} = require('aurelia-dependency-injection');
const {RecordService} = require('../services');

@inject(RecordService)
class RecordController {

    constructor(recordService) {
        this.recordService = recordService;
    }

    /**
     * Adds a record using body.line
     * @param req
     * @param res
     * @param next
     * @returns {Record}
     */
    post(req, res, next) {
        const line = req.body.line;

        if (!line || typeof line !== 'string') {
            return res.badRequest("No valid line was sent.");
        }

        return this.recordService.createDBRecordsFromLines([line])
            .then(records => res.ok(records[0]))
            .catch(err => res.serverError(err));
    }

    /**
     * Gets a list of all the records ordered ascending by gender
     * @param req
     * @param res
     * @param next
     * @returns {Promise.<Array[Record]>}
     */
    getSortedByGender(req, res, next) {
        return this.recordService.getOrderedList('gender')
            .then(records => res.ok(records))
            .catch(err => res.serverError(err));
    }

    /**
     * Gets a list of all the records ordered ascending by dateOfBirth
     * @param req
     * @param res
     * @param next
     * @returns {Promise.<Array[Record]>}
     */
    getSortedByDateOfBirth(req, res, next) {
        return this.recordService.getOrderedList('dateOfBirth')
            .then(records => res.ok(records))
            .catch(err => res.serverError(err));
    }

    /**
     * Gets a list of all the records ordered descending by lastName
     * @param req
     * @param res
     * @param next
     * @returns {Promise.<Array[Record]>}
     */
    getSortedByName(req, res, next) {
        return this.recordService.getOrderedList('lastName', 'DESC')
            .then(records => res.ok(records))
            .catch(err => res.serverError(err));
    }
}

const controller = Container.instance.get(RecordController);

module.exports = {
    post: controller.post.bind(controller),
    getSortedByGender: controller.getSortedByGender.bind(controller),
    getSortedByDateOfBirth: controller.getSortedByDateOfBirth.bind(controller),
    getSortedByName: controller.getSortedByName.bind(controller),
    class: RecordController
};
