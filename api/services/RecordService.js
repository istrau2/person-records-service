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

    /**
     * Returns a list of all records sorted by orderBy in the direction specified
     * @param orderBy string
     * @param direction [string = 'ASC']
     * @returns {Promise.<Array[Record]>}
     */
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

    /**
     * Adds records to the db by parsing lines (one for each line).
     * @param lines Array[string]
     * @returns {Promise.<Array[Record]>}
     */
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

    /**
     * Parses a line and returns a json representation of the record defined by the line
     * @param line string
     * @returns {{firstName: string, lastName: string, gender: string, favoriteColor: string, dateOfBirth: Date}}
     * @private
     */
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
