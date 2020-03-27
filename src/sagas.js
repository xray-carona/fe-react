import { all, call, put, takeLatest } from 'redux-saga/effects'

import { 
  actionTypes, 
  response,
  setAwsS3ImageUrl
 } from './actions';

import api from './api/upload-image-api.js';


function * uploadImageSaga (action) {
  try {
    const { photo } = action;
    const res = yield call(api.uploadImageToAwsS3, photo);
    yield put(setAwsS3ImageUrl(res.data));
    // yield put(response('You have successfully uploaded your image to S3:<br/> <a target="_blank" href='+res.data+'>Download</a>','alert-success'));
      yield put(response('You have successfully uploaded your image to S3','alert-success'));
  } catch (err) {
    yield put(response(err.message,'alert-danger'));
  }
}

function * rootSaga () {
  yield all([
    takeLatest(actionTypes.UPLOAD_IMAGE, uploadImageSaga)
  ])
}

export default rootSaga