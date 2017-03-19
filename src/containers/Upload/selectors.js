import { createSelector } from 'reselect';

const selectUpload = state => state.upload;

const selectDataFileName = createSelector(
    [ selectUpload ],
    formState => formState.requestFile
);

const selectPersonData = createSelector(
    [ selectUpload ],
    formState => formState.requestData
);

export {
    selectUpload,
    selectDataFileName,
    selectPersonData,
};
