/**
 * Created by istrauss on 10/16/2016.
 */

const {MockModelsService} = require('../../mocks');
const {RecordService} = require('../../services');

const mockModelsService = new MockModelsService();
const recordService = new RecordService(mockModelsService);

describe('RecordService', () => {
    describe('getOrderedList', () => {
        it('should call Record.find() with the specified orderBy and the default direction "ASC"', done => {
            const mockRecordModel = mockModelsService.get('Record');

            spyOn(mockRecordModel, 'find').and.callThrough();

            recordService.getOrderedList('name')
                .then(() => {
                    expect(mockRecordModel.find).toHaveBeenCalled();

                    const options = mockRecordModel.find.calls.mostRecent().args[0];
                    expect(options.sort).toEqual('name ASC');

                    done();
                });
        });
    });

    describe('_getRecordJsonFromLine method', () => {
        it('should process a pipe delimited line.', () => {
            const line = 'Joe | DEF | Male | Purple | 10-1-2013';
            const jsonRecord = recordService._getRecordJsonFromLine(line);
            expect(jsonRecord.firstName).toEqual('Joe');
            expect(jsonRecord.dateOfBirth).toEqual(new Date('10-1-2013'));
        });


        it('should process a comma delimited line.', () => {
            const line = 'GHI, JKL, Female, Pink, 10-1-2014';
            const jsonRecord = recordService._getRecordJsonFromLine(line);
            expect(jsonRecord.firstName).toEqual('GHI');
            expect(jsonRecord.dateOfBirth).toEqual(new Date('10-1-2014'));
        });


        it('should process a space delimited line.', () => {
            const line = 'MNO PQR Male Purple 10-1-2015';
            const jsonRecord = recordService._getRecordJsonFromLine(line);
            expect(jsonRecord.firstName).toEqual('MNO');
            expect(jsonRecord.dateOfBirth).toEqual(new Date('10-1-2015'));
        });
    });

    describe('createDBRecordsFromLines method', () => {
        it('should call Record.create() with the parsed json records', done => {
            const mockRecordModel = mockModelsService.get('Record');
            const lines = [
                'GHI, JKL, Female, Pink, 10-1-2014',
                'Joe, Anderson, Male, Blue, 10-1-2012'
            ];

            spyOn(mockRecordModel, 'create').and.callThrough();

            recordService.createDBRecordsFromLines(lines)
                .then(() => {
                    expect(mockRecordModel.create).toHaveBeenCalled();

                    const jsonRecordsToCreate = mockRecordModel.create.calls.mostRecent().args[0];
                    expect(jsonRecordsToCreate.length).toEqual(2);
                    expect(jsonRecordsToCreate[0].firstName).toEqual('GHI');
                    expect(jsonRecordsToCreate[1].lastName).toEqual('Anderson');
                    done();
                });
        });
    });
});
