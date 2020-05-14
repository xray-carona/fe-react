export const actionTypes = {
    SET_XRAY_IMAGE: 'SET_XRAY_IMAGE',
    SET_CT_SCAN_IMAGE: 'SET_CT_SCAN_IMAGE',
    UPLOAD_IMAGE: 'UPLOAD_IMAGE',
    SET_AWS_S3_IMAGE_URL: 'SET_AWS_S3_IMAGE_URL',
    RESPONSE: 'RESPONSE',
    GET_ML_RESPONSE: 'GET_ML_RESPONSE',
    SET_ML_RESPONSE: 'SET_ML_RESPONSE',
    SET_LOADING: 'SET_LOADING',
    ASSESS_RISK: 'ASSESS_RISK',
    SET_ASSESS_RISK_RESPONSE: 'SET_ASSESS_RISK_RESPONSE',
    
    REGISTER_USER: 'REGISTER_USER',
    REGISTER_USER_SUCCESS: 'REGISTER_USER_SUCCESS',
    REGISTER_USER_ERROR: 'REGISTER_USER_ERROR',
    LOGIN_USER: 'LOGIN_USER',
    LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS',
    LOGIN_USER_ERROR: 'LOGIN_USER_ERROR',
    LOGOUT_USER: 'LOGOUT_USER',

    CLEAR_RESULTS: 'CLEAR_RESULTS',
    SET_PATIENT_INFO: 'SET_PATIENT_INFO',
    LOAD_PATIENTS: 'LOAD_PATIENTS',
    SET_ALL_PATIENTS: 'SET_ALL_PATIENTS',
    SET_CURRENT_PATIENT: 'SET_CURRENT_PATIENT',
    GET_PATIENT_DETAILS: 'GET_PATIENT_DETAILS',
    SET_PATIENT_DETAILS: 'SET_PATIENT_DETAILS'
}

export const getAwsS3ImageUrl = (state) => state.aws_s3_image_url;

export function uploadImage (photo, patientInfo, modelType) {
  return {
    type: actionTypes.UPLOAD_IMAGE,
    photo,
    patientInfo,
    modelType
  }
}
export function setXrayImage (xray_image) {
  return {
    type: actionTypes.SET_XRAY_IMAGE,
    xray_image
  }
}

export function setCTScanImage (ct_scan_image) {
  return {
    type: actionTypes.SET_CT_SCAN_IMAGE,
    ct_scan_image
  }
}

export function setAwsS3ImageUrl(url) {
  return { type: actionTypes.SET_AWS_S3_IMAGE_URL, url }
}

export function getMLResponse(aws_s3_image_url) {
  return { type: actionTypes.GET_ML_RESPONSE, aws_s3_image_url }
}

export function setMLResponse(ml_response) {
  return { type: actionTypes.SET_ML_RESPONSE, ml_response }
}

export function setLoading(loading) {
  return { type: actionTypes.SET_LOADING, loading }
}

export function response (response,type) {
  return {
    type: actionTypes.RESPONSE,
    data: { _response: response, _type: type }
  }
}

export function clearResults() {
  return {
    type: actionTypes.CLEAR_RESULTS,
    data: {}
  }
}

export function logout() {
  return {
    type: actionTypes.LOGOUT_USER,
    data: {}
  }
}

export function setPatientInfo(patientInfo) {
  return { type: actionTypes.SET_PATIENT_INFO, patientInfo }
}

export function assessRisk (patientInfo) {
  return {
    type: actionTypes.ASSESS_RISK,
    patientInfo
  }
}

export function setAssessRiskResponse(risk_response) {
  return { type: actionTypes.SET_ASSESS_RISK_RESPONSE, risk_response }
}

export function loadPatients() {
  return {type: actionTypes.LOAD_PATIENTS, data: {}}
}

export function setAllPatients(allPatients) {
  return {type: actionTypes.SET_ALL_PATIENTS, allPatients}
}


export function setCurrentPatient(patientId) {
  return {type: actionTypes.SET_CURRENT_PATIENT, patientId}
}

export function loadPatientDetails(patientId) {
  
  return {type: actionTypes.GET_PATIENT_DETAILS, patientId}
}

export function setPatientDetails(patientDetails) {
  return {type: actionTypes.SET_PATIENT_DETAILS, patientDetails}
}
