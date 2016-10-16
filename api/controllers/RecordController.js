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

    post(req, res, next) {
        const line = req.body.line;

        if (!line || typeof line !== 'string') {
            return res.badRequest("No valid line was sent.");
        }

        return this.recordService.createDBRecordsFromLines([line])
            .then(records => res.ok(records[0]))
            .catch(err => res.serverError(err));
    }

    getSortedByGender(req, res, next) {
        return this.recordService.getOrderedList('gender')
            .then(records => res.ok(records))
            .catch(err => res.serverError(err));
    }

    getSortedByDateOfBirth(req, res, next) {
        return this.recordService.getOrderedList('dateOfBirth')
            .then(records => res.ok(records))
            .catch(err => res.serverError(err));
    }

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
