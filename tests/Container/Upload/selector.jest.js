import {
    selectUpload,
    selectDataFileName,
} from 'containers/Upload/selectors';

describe('Upload/selectors', () => {
    describe('selectUpload', () => {
        it('should select the global form state', () => {
            const formState = {};
            const mockedState = {upload: formState};
            expect(selectUpload(mockedState)).toEqual(formState);
        });
    });


});