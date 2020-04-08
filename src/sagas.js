import { all, call, put, takeLatest, select } from 'redux-saga/effects'
import { push } from 'react-router-redux';

import { 
  actionTypes, 
  response,
  setAwsS3ImageUrl,
  setMLResponse,
  getAwsS3ImageUrl
 } from './actions';

import api from './api/upload-image-api.js';
import { registerUserService, loginUserService } from './api/authenticationService';

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
    yield put(push('/results'));
  } catch (err) {
    yield put(response(err.message,'alert-danger'));
  }
}

function* registerSaga(payload) {
  try {
    const response = yield call(registerUserService, payload);
    yield put({ type: actionTypes.REGISTER_USER_SUCCESS, response })
  } catch(error) {
    yield put({ type: actionTypes.REGISTER_USER_ERROR, error });
  }
}

function* loginSaga(payload) {
  try {
    const response = yield call(loginUserService, payload);
    yield put({ type: actionTypes.LOGIN_USER_SUCCESS, response });
  } catch(error) {
    yield put({ type: actionTypes.LOGIN_USER_ERROR, error })
  }
}

function * rootSaga () {
  yield all([
    takeLatest(actionTypes.UPLOAD_IMAGE, uploadImageSaga),
    takeLatest(actionTypes.REGISTER_USER, registerSaga),
    takeLatest(actionTypes.LOGIN_USER, loginSaga)
  ])
}

export default rootSaga