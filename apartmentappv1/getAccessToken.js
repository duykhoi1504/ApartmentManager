// import { Platform } from 'react-native';
// import { GoogleAuth } from 'google-auth-library';

// const SCOPES = ['https://www.googleapis.com/auth/cloud-platform'];

// async function getAccessToken() {
//   try {
//     const key = require('../apartmentapp-aff43-firebase-adminsdk-9jmux-5f6fc721e5.json');
//     const auth = new GoogleAuth({
//       credentials: {
//         client_email: key.client_email,
//         private_key: key.private_key,
//       },
//       scopes: SCOPES,
//     });

//     const accessToken = await auth.getAccessToken();
//     return accessToken;
//   } catch (error) {
//     console.error('Error getting access token:', error);
//     throw error;
//   }
// }

// export default getAccessToken;