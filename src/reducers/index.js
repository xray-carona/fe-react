import { actionTypes } from '../actions'

export const InitialState = {
  msg: '',
  type: '',
  aws_s3_image_url: ''
}

function reducer (state = InitialState, action) {
  switch (action.type) {
    case actionTypes.SET_AWS_S3_IMAGE_URL:
      return {
        ...state,
        ...{ aws_s3_image_url: action.url }
      }

    case actionTypes.RESPONSE:
      return {
        ...state,
        ...{ msg: action.data._response, type: action.data._type  }
      }

    default:
      return state
  }
}

export default reducer