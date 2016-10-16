/**
 * Created by istrauss on 10/15/2016.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const Promise = require('bluebird');
const {inject} = require('aurelia-dependency-injection');
const RecordService = require('./RecordService');
const dataDirPath = path.resolve( __dirname, '../../data');

@inject(RecordService)
class DBSeederService {

    constructor(recordService) {
        this.recordService = recordService;
    }

    /**
     * Initiates the seeding of th db using files contained in /data
     * @returns {Promise}
     */
    seed() {
        return this.getDataFileNames()
            .then(fileNames => {
                return this.getLinesFromFiles(fileNames);
            })
            .then(lines => {
                return this.recordService.createDBRecordsFromLines(lines);
            })
            .then(dbRecords => {
                console.log('DB Seeded.');
            })
            .catch(err => {
                throw new Error('Fatal error: could not seed the db - ' + err.message);
            });
    }

    /**
     * Gets all fileNames in /data
     * @returns {Promise.<Array[string]>}
     */
    getDataFileNames() {
        return new Promise((resolve, reject) => {
            fs.readdir(dataDirPath, (err, files) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(files);
            });
        });
    }

    /**
     * Gets all lines in the files specified.
     * @param fileNames Array[string]
     * @returns {Promise.<Array[string]>}
     */
    getLinesFromFiles(fileNames) {
        return Promise.all(fileNames.map(fileName => this.getLinesFromFile(fileName)))
            .then(linesArrays => {
                return linesArrays.reduce((_totalLineArr, lineArr) => {
                    return _totalLineArr.concat(lineArr);
                }, []);
            });
    }

    /**
     * Gets all lines from a single file.
     * @param fileName string
     * @returns {Promise.<Array[string]>}
     */
    getLinesFromFile(fileName) {
        const _this = this;
        return new Promise((resolve, reject) => {
            const records = [];
            const lineReader = readline.createInterface({
                input: fs.createReadStream(dataDirPath + '/' + fileName)
            });

            lineReader.on('line', function (line) {
                records.push(line)
            });

            lineReader.on('close', function (line) {
                resolve(records);
            });
        });
    }
}

module.exports = DBSeederService;
