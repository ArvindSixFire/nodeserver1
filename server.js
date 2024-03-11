// // uploadImages.js
// const express = require('express');
// const multer = require('multer');
// const fs = require('fs');
// const path = require('path');

// const app = express();

// // Set up multer for handling file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   }
// });
// const upload = multer({ storage: storage });

// // Route to upload images with form data
// app.post('/upload', upload.fields([{ name: 'colorImage', maxCount: 1 }, { name: 'normalImage', maxCount: 1 }]), (req, res) => {
//   const { colorImage, normalImage } = req.files;

//   // Check if both images were uploaded
//   if (!colorImage || !normalImage) {
//     return res.status(400).send('Both colorImage and normalImage are required.');
//   }

//   // Move the uploaded files to a different directory
// //   const moveToDirectory = (file, directory) => {
// //     const oldPath = path.join(__dirname, 'uploads', file[0].filename);
// //     const newPath = path.join(__dirname, directory, file[0].originalname);
// //     fs.renameSync(oldPath, newPath);
// //   };

// //   // Move colorImage and normalImage to a different directory
// //   moveToDirectory(colorImage, 'colorImages');
// //   moveToDirectory(normalImage, 'normalImages');

//   res.send('Images uploaded successfully.');
// });

// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// uploadImages.js
// const express = require('express');
// const multer = require('multer');
// const fs = require('fs');
// const path = require('path');

// const app = express();

// // Set up multer for handling file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   }
// });
// const upload = multer({ storage: storage });

// // Route to upload images with form data
// app.post('/upload', upload.fields([{ name: 'folderName', maxCount: 1 }, { name: 'colorImage', maxCount: 1 }, { name: 'normalImage', maxCount: 1 }]), (req, res) => {
//   const { folderName, colorImage, normalImage } = req.files;

//   // Check if folderName, colorImage, and normalImage were uploaded
//   if (!folderName || !colorImage || !normalImage) {
//     return res.status(400).send('folderName, colorImage, and normalImage are required.');
//   }

//   // Move the uploaded files to the specified folder
//   const moveToFolder = (file, directory) => {
//     const oldPath = path.join(__dirname, 'uploads', file[0].filename);
//     const newPath = path.join(__dirname, 'uploads', directory, file[0].originalname);
//     fs.renameSync(oldPath, newPath);
//   };

//   // Move colorImage and normalImage to the specified folder
//   moveToFolder(folderName, 'folders');
//   moveToFolder(colorImage, path.join('folders', folderName[0].originalname));
//   moveToFolder(normalImage, path.join('folders', folderName[0].originalname));

//   // Log the JSON containing the file paths
//   const filePaths = {
//     colorImagePath: path.join(__dirname, 'uploads', 'folders', folderName[0].originalname, colorImage[0].originalname),
//     normalImagePath: path.join(__dirname, 'uploads', 'folders', folderName[0].originalname, normalImage[0].originalname)
//   };
//   console.log(JSON.stringify(filePaths));

//   res.send('Images uploaded successfully.');
// });

// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


// uploadImages.js
// uploadImages.js
// uploadImages.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const folderName = req.body.folderName;
    const originalName = file.originalname;
    const fileName = `${folderName}_${originalName}`;
    cb(null, fileName);
  }
});
const upload = multer({ storage: storage });

// Route to upload images with form data
app.post('/upload', upload.fields([{ name: 'folderName', maxCount: 1 }, { name: 'colorImage', maxCount: 1 }, { name: 'normalImage', maxCount: 1 }]), async (req, res) => {
  const { folderName, colorImage, normalImage } = req.files;

  // Check if folderName, colorImage, and normalImage were uploaded
  if (!folderName || !colorImage || !normalImage) {
    return res.status(400).send('folderName, colorImage, and normalImage are required.');
  }

  // Log the JSON containing the folder name and image locations
  const folderPath = path.join(__dirname, 'uploads', folderName[0].originalname);
  const filePaths = {
    folderName: folderName[0].originalname,
    colorImagePath: path.join(folderPath, colorImage[0].filename),
    normalImagePath: path.join(folderPath, normalImage[0].filename)
  };
  console.log(JSON.stringify(filePaths));

  res.json(filePaths);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
