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
    const { patientInfo } = action;
    const res = yield call(api.uploadImageToAwsS3, photo);
    yield put(setAwsS3ImageUrl(res.data));
    // yield put(response('You have successfully uploaded your image to S3','alert-success'));
    let url = yield select(getAwsS3ImageUrl);
    const mlAPIResponse = yield call(api.getMLResponse, url, patientInfo);
    yield put(setMLResponse(mlAPIResponse.data));
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