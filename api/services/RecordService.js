/**
 * Created by istrauss on 10/15/2016.
 */

const Promise = require('bluebird');
const {inject} = require('aurelia-dependency-injection');
const ModelsService = require('./ModelsService');

@inject(ModelsService)
class RecordService {

    constructor(modelsService) {
        this.modelsService = modelsService;
    }

    getOrderedList(orderBy, direction = 'ASC') {
        return new Promise((resolve, reject) => {
            this.modelsService.get('Record').find({
                sort: orderBy + ' ' + direction
            }).exec((err, records) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(records);
            });
        });
    }

    createDBRecordsFromLines(lines) {
        const jsonRecords = lines.map(line => this._getRecordJsonFromLine(line));

        return new Promise((resolve, reject) => {
            this.modelsService.get('Record').create(jsonRecords).exec((err, records) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(records);
            });
        });
    }

    _getRecordJsonFromLine(line) {
        let delimiter = ' ';

        if (line.indexOf('|') > -1) {
            delimiter = ' | ';
        }
        else if (line.indexOf(',') > -1) {
            delimiter = ', ';
        }

        const splitLine = line.split(delimiter);
        return {
            firstName: splitLine[0],
            lastName: splitLine[1],
            gender: splitLine[2],
            favoriteColor: splitLine[3],
            dateOfBirth: new Date(splitLine[4])
        };
    }
}

module.exports = RecordService;
