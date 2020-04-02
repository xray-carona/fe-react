import { actionTypes } from '../actions'

export const InitialState = {
  msg: '',
  type: '',
  aws_s3_image_url: ''
}

function reducer (state = InitialState, action) {
  switch (action.type) {
    case actionTypes.SET_AWS_S3_IMAGE_URL:
      state.loading = false;
      return {
        ...state,
        ...{ aws_s3_image_url: action.url }
      }

    case actionTypes.RESPONSE:
      return {
        ...state,
        ...{ msg: action.data._response, type: action.data._type  }
      }

    case actionTypes.SET_ML_RESPONSE:
      return {
        ...state,
        ...{ 
              covid_diagnosis: action.ml_response.covid_diagnosis,
              annotated_img_url: action.ml_response.annotated_img_url 
            }
    }

    default:
      return state
  }
}

export default reducer