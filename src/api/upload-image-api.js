import axios from 'axios'

const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
};

const uploadImageToAwsS3 = async photo =>  await axios.post('/api/v1/upload', photo, config)

export default { uploadImageToAwsS3 }