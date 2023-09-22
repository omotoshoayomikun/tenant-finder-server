var cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: 'ayomikun', 
    api_key: '988962625294199', 
    api_secret: 'Dwm1LEQx_UnCxfLe_-gCCfRzJ6s',
    secure: true,
  });

  module.exports = cloudinary