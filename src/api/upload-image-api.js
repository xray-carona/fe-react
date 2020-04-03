import axios from 'axios'

const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
};

const uploadImageToAwsS3 = async photo =>  await axios.post('/api/v1/upload', photo, config);
const getMLResponse = async (url, patientInfo) =>  await axios.post('/api/v1/getMLResponse', {url:url, patientInfo:patientInfo}, config);

export default { uploadImageToAwsS3, getMLResponse}