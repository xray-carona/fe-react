import { actionTypes } from '../actions'

export const InitialState = {
  xray_image: '',
  msg: '',
  type: '',
  aws_s3_image_url: '',
  loading: false
}

function reducer (state = InitialState, action) {
  const response = action.response;
  switch (action.type) {
    case actionTypes.SET_AWS_S3_IMAGE_URL:
      return {
        ...state,
        ...{ aws_s3_image_url: action.url,
            loading: false }
      }

    case actionTypes.SET_XRAY_IMAGE:
      return {
        ...state,
        ...{ xray_image: action.xray_image
            }
      }

    case actionTypes.RESPONSE:
      return {
        ...state,
        ...{ msg: action.data._response, type: action.data._type, loading: false  }
      }

    case actionTypes.SET_ML_RESPONSE:
      return {
        ...state,
        ...{ 
              covid_diagnosis: action.ml_response.covid_diagnosis,
              annotated_img_url: action.ml_response.annotated_img_url,
              lung_conditions: action.ml_response.lung_conditions
            }
    }
    case actionTypes.SET_LOADING:
      return {
        ...state,
        ...{ loading: action.loading  }
      }

    case actionTypes.REGISTER_USER_SUCCESS:
      return { ...state, response };
    case actionTypes.REGISTER_USER_ERROR:
      return { ...state, response };
    case actionTypes.LOGIN_USER_SUCCESS:
      return { ...state, response };
    case actionTypes.LOGIN_USER_ERROR:
    return { ...state, response };

    case actionTypes.CLEAR_RESULTS:
      return {
        ...state,
        ...{
            covid_diagnosis: null,
            annotated_img_url: null,
            lung_conditions: null,
            xray_image: null
          }
      }
    case actionTypes.LOGOUT_USER:
      return {
        ...state,
        ...{
            response: {}
          }
      }
    default:
      return state
  }
}

export default reducer