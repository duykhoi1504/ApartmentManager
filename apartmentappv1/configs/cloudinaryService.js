// import { v2 as cloudinary } from 'cloudinary';

// cloudinary.config({
//   cloud_name: 'dawe6629q',
//   api_key: '792324443965744',
//   api_secret: 'IRf1tMT1a8XkGBcb1BAKWbTgdsU',
// });

// const uploadToCloudinary = async (imageUri) => {
//   try {
//     const response = await cloudinary.uploader.upload(imageUri, {
//       upload_preset: 'ml_default', // replace with your preset if needed
//     });
//     return response.secure_url;
//   } catch (error) {
//     console.error('Cloudinary Response Error:', error);
//     throw new Error('Failed to upload image to Cloudinary');
//   }
// };

// export { uploadToCloudinary };