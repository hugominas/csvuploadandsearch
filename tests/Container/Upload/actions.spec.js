import {
    UPDATE_FORM,
    UPLOAD_FORM,
    UPLOAD_FORM_SUCCESSFUL,
    SEARCH_TEXT_REQUEST,
    SEARCH_TEXT_SUCCESSFUL,
} from 'containers/Upload/constants';

import {
    updateForm,
    uploadCSV,
    uploadCSVSuccessfull,
    searchText,
    searchSuccessful,
} from 'containers/Upload/actions';

describe('Upload/actions', () => {
    describe('updateForm', () => {
        it('should update the correct item on the store', () => {
            const expectedResult = {type: UPDATE_FORM, payload: {name: 'name', value: 'value'}};

            expect(updateForm('name', 'value')).toEqual(expectedResult);
        });
    });

    describe('uploadCSV', () => {
        it('it should pass the csv file', () => {
            const expectedResult = {type: UPLOAD_FORM, payload: {file: 'file to send'}};

            expect(uploadCSV('file to send')).toEqual(expectedResult);

        });
    });

    describe('uploadCSVSuccessfull', () => {
        it('it should pass server paylod with temporary file', () => {
            const expectedResult = {
                type: UPLOAD_FORM_SUCCESSFUL,
                payload: {status: 'done', file: 'serverFileName.csv'}
            };

            expect(uploadCSVSuccessfull({status: 'done', file: 'serverFileName.csv'})).toEqual(expectedResult);

        });
    });

    describe('searchText', () => {
        it('it should pass searchText to the server', () => {
            const expectedResult = {type: SEARCH_TEXT_REQUEST, payload: {text: 'search'}};

            expect(searchText({text: 'search'})).toEqual(expectedResult);

        });
    });

    describe('searchSuccessful', () => {
        it('it should pass searchText to the server', () => {
            const expectedResult = {
                type: SEARCH_TEXT_SUCCESSFUL,
                payload: {status: 'done', text: [{id: 1}, {id: 2}, {id: 3}]}
            };

            expect(searchSuccessful({status: 'done', text: [{id: 1}, {id: 2}, {id: 3}]})).toEqual(expectedResult);

        });
    });
});