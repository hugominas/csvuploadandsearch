import { createSelector } from 'reselect';

const selectUpload = state => state.upload;

const selectDataFileName = createSelector(
    [ selectUpload ],
    formState => formState.requestFile
);


export {
    selectUpload,
    selectDataFileName,
};
