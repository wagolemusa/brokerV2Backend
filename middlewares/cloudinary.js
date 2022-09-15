const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SCRECT,
}); 

module.exports = cloudinary;


// const uploadcloud = (file, folder) => {
//   return new Promise(resolve => {
//     cloudinary.uploader.upload(file, (result) =>{
//       resolve({
//         url: result.url,
//         id: result.public_id
//       })

//     }, {
//       resource_type: "auto",
//       folder: folder
    

//     })

//   })
// }
// export default uploadcloud;