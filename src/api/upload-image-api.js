import axios from 'axios';

const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
};

const uploadImageToAwsS3 = async photo =>  await
	axios.post(process.env.REACT_APP_BE_EXPRESS_APP_HOST+'/api/v1/upload',
	 photo,
	 config
	);
const getMLResponse = async (url, patientInfo) =>  await
	axios.post(process.env.REACT_APP_BE_EXPRESS_APP_HOST+'/api/v1/getMLResponse',
	 {
		url:url,
		patientInfo:patientInfo
	 }
	);

export default { uploadImageToAwsS3, getMLResponse}