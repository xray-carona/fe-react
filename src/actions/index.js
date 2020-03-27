export const actionTypes = {
    UPLOAD_IMAGE: 'UPLOAD_IMAGE',
    SET_AWS_S3_IMAGE_URL: 'SET_AWS_S3_IMAGE_URL',
    RESPONSE: 'RESPONSE'
}

export function uploadImage (photo) {
  return {
    type: actionTypes.UPLOAD_IMAGE,
    photo
  }
}

export function setAwsS3ImageUrl(url) {
  return { type: actionTypes.SET_AWS_S3_IMAGE_URL, url }
}

export function response (response,type) {
  return {
    type: actionTypes.RESPONSE,
    data: { _response: response, _type: type }
  }
}