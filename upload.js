// const fs = require('fs');
// const path = require('path');

// // Read colorImage and normalImage from disk
// const colorImagePath = path.join(__dirname, 'color.jpg');
// const normalImagePath = path.join(__dirname, 'normal.jpg');
// const colorImageBuffer = fs.readFileSync(colorImagePath);
// const normalImageBuffer = fs.readFileSync(normalImagePath);

// // Create FormData object
// const formData = new FormData();
// formData.append('colorImage', new Blob([colorImageBuffer]), 'color.jpg');
// formData.append('normalImage', new Blob([normalImageBuffer]), 'normal.jpg');

// // Send FormData to the server
// fetch('http://localhost:3000/upload', {
//   method: 'POST',
//   body: formData
// })
// .then(response => response.text())
// .then(result => {
//   console.log(result);
// })
// .catch(error => {
//   console.error('Error:', error);
// });



const fs = require('fs').promises;
const path = require('path');

async function uploadImages() {
  const folderNames = ['a', 'b', 'c'];

  for (let folderName of folderNames) {
    const files = await fs.readdir(path.join(__dirname, folderName));
    const colorImageName = files.find(file => file.includes('color'));
    const normalImageName = files.find(file => file.includes('normal'));

    if (colorImageName && normalImageName) {
      const colorImagePath = path.join(__dirname, folderName, colorImageName);
      const normalImagePath = path.join(__dirname, folderName, normalImageName);

      try {
        const colorImageBuffer = await fs.readFile(colorImagePath);
        const normalImageBuffer = await fs.readFile(normalImagePath);

        const colorImageBlob = new Blob([colorImageBuffer], { type: 'image/jpeg' });
        const normalImageBlob = new Blob([normalImageBuffer], { type: 'image/jpeg' });

        const formData = new FormData();
        formData.append('folderName', folderName);
        formData.append('colorImage', colorImageBlob, colorImageName);
        formData.append('normalImage', normalImageBlob, normalImageName);

        const response = await fetch('http://localhost:3000/upload', {
          method: 'POST',
          body: formData
        });

        const resultText = await response.text();
        try {
          const result = JSON.parse(resultText);
          console.log(result);
        } catch (parseError) {
          console.error('Failed to parse JSON response:', parseError);
          console.log('Response text:', resultText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.error(`Color or normal image not found in folder ${folderName}`);
    }
  }
}

uploadImages();