/**
 * Created by istrauss on 10/16/2016.
 */

const {MockResponse, MockRecordService} = require('../../mocks');
const {RecordController} = require('../../controllers');
const mockRecordService = new MockRecordService();
const mockResponse = new MockResponse();
const recordController = new RecordController(mockRecordService);

describe('RecordController', () => {
    describe('post', () => {
        const req = {
            body: {
                line: 'A line.'
            }
        };

        it('should call recordService.createDBRecordsFromLines with req.body.line', done => {

            spyOn(mockRecordService, 'createDBRecordsFromLines').and.callThrough();

            recordController.post(req, mockResponse)
                .then(() => {
                    expect(mockRecordService.createDBRecordsFromLines).toHaveBeenCalled();

                    const lines = mockRecordService.createDBRecordsFromLines.calls.mostRecent().args[0];

                    expect(lines[0]).toEqual('A line.');

                    done();
                });
        });

        it('should call response.ok with the new record.', done => {

            spyOn(mockResponse, 'ok').and.callThrough();

            recordController.post(req, mockResponse)
                .then(() => {
                    expect(mockResponse.ok).toHaveBeenCalled();

                    const record = mockResponse.ok.calls.mostRecent().args[0];

                    expect(record.name).toEqual('mockRecord');

                    done();
                });
        });
    });

    describe('getSortedByGender method', () => {
        it('should call recordService.getOrderedList with "gender" and response.ok', done => {

            spyOn(mockRecordService, 'getOrderedList').and.callThrough();
            spyOn(mockResponse, 'ok').and.callThrough();

            recordController.getSortedByGender(null, mockResponse)
                .then(() => {
                    expect(mockRecordService.getOrderedList).toHaveBeenCalledWith('gender');
                    expect(mockResponse.ok).toHaveBeenCalled();

                    done();
                });
        });
    });

    describe('getSortedByDateOfBirth method', () => {
        it('should call recordService.getOrderedList with "dateOfBirth" and response.ok', done => {

            spyOn(mockRecordService, 'getOrderedList').and.callThrough();
            spyOn(mockResponse, 'ok').and.callThrough();

            recordController.getSortedByDateOfBirth(null, mockResponse)
                .then(() => {
                    expect(mockRecordService.getOrderedList).toHaveBeenCalledWith('dateOfBirth');
                    expect(mockResponse.ok).toHaveBeenCalled();

                    done();
                });
        });
    });

    describe('getSortedByName method', () => {
        it('should call recordService.getOrderedList with "lastName" and "DESC" and response.ok', done => {

            spyOn(mockRecordService, 'getOrderedList').and.callThrough();
            spyOn(mockResponse, 'ok').and.callThrough();

            recordController.getSortedByName(null, mockResponse)
                .then(() => {
                    expect(mockRecordService.getOrderedList).toHaveBeenCalledWith('lastName', 'DESC');
                    expect(mockResponse.ok).toHaveBeenCalled();

                    done();
                });
        });
    });
});
