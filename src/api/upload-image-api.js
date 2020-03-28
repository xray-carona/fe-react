import axios from 'axios'

const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
};

const uploadImageToAwsS3 = async photo =>  await axios.post('http://localhost:3001/api/v1/upload', photo, config);
const getMLResponse = async url =>  await axios.post('http://localhost:3001/api/v1/getMLResponse', url, config);

export default { uploadImageToAwsS3, getMLResponse}