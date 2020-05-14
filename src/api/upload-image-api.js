import axios from 'axios';

const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
};

const uploadImageToAwsS3 = async photo => await
axios.post(process.env.REACT_APP_BE_EXPRESS_APP_HOST + '/api/v1/upload',
    photo,
    config
);
const getMLResponse = async (url, patientInfo, userId, modelType) => await
axios.post(process.env.REACT_APP_BE_EXPRESS_APP_HOST + '/api/v1/getMLResponse', {
    params: {
        url: url,
        patientInfo: patientInfo,
        userId: userId,
        model_type: modelType
    },
    config
});

const getRiskAssessment = async (patientInfo, userId) => await
axios.post(process.env.REACT_APP_BE_EXPRESS_APP_LOCALHOST + '/api/v1/riskAssessment', {
    params: {
        patientInfo: patientInfo,
        userId: userId
    },
    config
});

const getAllPatients = async (userId) => await
axios.post(process.env.REACT_APP_BE_EXPRESS_APP_LOCALHOST + '/api/v1/getAllPatients', {
        user_id: userId
});

const getPatientProfile = async (patientId) => await
axios.post(process.env.REACT_APP_BE_EXPRESS_APP_LOCALHOST + '/api/v1/getPatientProfile', {
        patient_id: patientId
});

export default { uploadImageToAwsS3, getMLResponse, getRiskAssessment, getAllPatients, getPatientProfile }