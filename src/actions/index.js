export const actionTypes = {
    UPLOAD_IMAGE: 'UPLOAD_IMAGE',
    SET_AWS_S3_IMAGE_URL: 'SET_AWS_S3_IMAGE_URL',
    RESPONSE: 'RESPONSE',
    GET_ML_RESPONSE: 'GET_ML_RESPONSE',
    SET_ML_RESPONSE: 'SET_ML_RESPONSE',
    DISPLAY_IMAGE: 'display'
}

export const getAwsS3ImageUrl = (state) => state.aws_s3_image_url;

export function uploadImage (photo) {
  return {
    type: actionTypes.UPLOAD_IMAGE,
    photo
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

export function response (response,type) {
  return {
    type: actionTypes.RESPONSE,
    data: { _response: response, _type: type }
  }
}

export function displayImage (response,type) {
    return {
        type: actionTypes.DISPLAY_IMAGE,
        data: { _response: response, _type: type }
    }
}