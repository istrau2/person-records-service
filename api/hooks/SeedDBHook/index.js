/**
 * Created by istrauss on 10/14/2016.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const moment = require('moment');
const Promise = require('bluebird');
const dataDirPath = path.resolve( __dirname, '../../../data');

module.exports = function(sails) {
    return {
        initialize: function(next) {
            this.getDataFileNames()
                .then(fileNames => {
                    return this.getJsonRecordsFromFiles(fileNames);
                })
                .then(jsonRecords => {
                    return this.createDBPersonsFromJsonRecords(jsonRecords);
                })
                .then(dbRecords => {
                    console.log('DB Seeded.');
                    next();
                })
                .catch(() => {
                    throw new Error('Fatal error: could not seed the db - ' + err.message);
                });
        },
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
        },
        getJsonRecordsFromFiles(fileNames) {
            return Promise.all(fileNames.map(fileName => this.getJsonRecordsFromFile(fileName)))
                .then(recordsArrays => {
                    return recordsArrays.reduce((_totalRecordArr, recordArr) => {
                        return _totalRecordArr.concat(recordArr);
                    }, []);
                });
        },
        getJsonRecordsFromFile(fileName) {
            const _this = this;
            return new Promise((resolve, reject) => {
                const records = [];
                const lineReader = readline.createInterface({
                    input: fs.createReadStream(dataDirPath + '/' + fileName)
                });

                lineReader.on('line', function (line) {
                    records.push(_this.getRecordFromLine(line))
                });

                lineReader.on('close', function (line) {
                    resolve(records);
                });
            });
        },
        getRecordFromLine(line) {
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
                dateOfBirth: moment(splitLine[4]).toDate()
            };
        },
        createDBPersonsFromJsonRecords(records) {
            return new Promise((resolve, reject) => {
                Person.create(records).exec((err, records) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(records);
                });
            });
        }
    };
};