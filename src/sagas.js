import { all, call, put, takeLatest, select } from 'redux-saga/effects'

import { 
  actionTypes, 
  response,
  setAwsS3ImageUrl,
  setMLResponse,
  getAwsS3ImageUrl
 } from './actions';

import api from './api/upload-image-api.js';


function * uploadImageSaga (action) {
  try {
    const { photo } = action;
    const res = yield call(api.uploadImageToAwsS3, photo);
    yield put(setAwsS3ImageUrl(res.data));
    // yield put(response('You have successfully uploaded your image to S3:<br/> <a target="_blank" href='+res.data+'>Download</a>','alert-success'));
    yield put(response('You have successfully uploaded your image to S3','alert-success'));
    yield put(setMLResponse(null));
  } catch (err) {
    yield put(response(err.message,'alert-danger'));
  }
}

function * mLResponseSaga (action) {
  try {
    let url = yield select(getAwsS3ImageUrl);
    const res = yield call(api.getMLResponse, url);
    yield put(setMLResponse(res.data));
  } catch (err) {
    yield put(response(err.message,'alert-danger'));
  }
}

function * rootSaga () {
  yield all([
    takeLatest(actionTypes.UPLOAD_IMAGE, uploadImageSaga),
    takeLatest(actionTypes.GET_ML_RESPONSE, mLResponseSaga)
  ])
}

export default rootSaga