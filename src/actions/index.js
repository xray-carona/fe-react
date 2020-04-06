export const actionTypes = {
    SET_XRAY_IMAGE: 'SET_XRAY_IMAGE',
    UPLOAD_IMAGE: 'UPLOAD_IMAGE',
    SET_AWS_S3_IMAGE_URL: 'SET_AWS_S3_IMAGE_URL',
    RESPONSE: 'RESPONSE',
    GET_ML_RESPONSE: 'GET_ML_RESPONSE',
    SET_ML_RESPONSE: 'SET_ML_RESPONSE',
    SET_LOADING: 'SET_LOADING'
}

export const getAwsS3ImageUrl = (state) => state.aws_s3_image_url;

export function uploadImage (photo, patientInfo) {
  return {
    type: actionTypes.UPLOAD_IMAGE,
    photo,
    patientInfo
  }
}
export function setXrayImage (xray_image) {
  return {
    type: actionTypes.SET_XRAY_IMAGE,
    xray_image
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