/**
 * Created by istrauss on 10/14/2016.
 */

const fs = require('fs');
const path = require('path');
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
                fs.readFile(dataDirPath + '/' + fileName, (err, contents) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    return _this.parseFileContents(contents);
                });
            });
        },
        parseFileContents(contents) {
            return contents.split('\n')
                .map(lineContent => this.getRecordFromLineContent);
        },
        getRecordFromLineContent(lineContent) {
            const splitLineContent = lineContent.split(/[\s\|\s,\,\s,\s]/g);
            return {
                firstName: splitLineContent[0],
                lastName: splitLineContent[1],
                gender: splitLineContent[2],
                favoriteColor: splitLineContent[3],
                dateOfBirth: moment(splitLineContent[4]).toDate()
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