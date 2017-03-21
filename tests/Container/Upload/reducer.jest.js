import uploadReducer, {initialState} from 'containers/Upload/reducer';

import {
    UPDATE_FORM,
    UPLOAD_FORM,
    UPLOAD_FORM_SUCCESSFUL,
    SEARCH_TEXT_SUCCESSFUL,
} from 'containers/Upload/constants';


describe('Upload/reducer', () => {
    it('should return default state', () => {
        expect(
            uploadReducer(undefined, {})
        ).toEqualImmutable(initialState);
    });

    it('should update form element', () => {
        const payload = {
            name: 'street',
            value: 'some street',
        };
        expect(
            uploadReducer({}, {
                payload,
                type: UPDATE_FORM,
            })
        ).toEqual(
            {'street': 'some street'}
        );
    });

    it('should upload form', () => {
        const payload = {
            name: 'street',
            value: 'some street',
        };
        expect(
            uploadReducer({}, {
                payload,
                type: UPLOAD_FORM,
            })
        ).toEqual({});
    });
    it('should upload form', () => {
        const payload = [{id: 1}, {id: 2}, {id: 3}];
        expect(
            uploadReducer({}, {
                payload,
                type: SEARCH_TEXT_SUCCESSFUL,
            })
        ).toEqual({requestData: [{id: 1}, {id: 2}, {id: 3}]});
    });
});