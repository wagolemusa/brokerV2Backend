const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })

  // const fileFilter = (req, file, cb) => {
  //   if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
  //       cb(null, true)
  //   }else{
  //       cb({message: 'Unsupported file format'}, false)
  //   }
  // }

 const upload = multer({ storage})
 
export default upload;