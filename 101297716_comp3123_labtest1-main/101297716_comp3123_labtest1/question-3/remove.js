// Import mdodules
const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, 'Logs'); // Path to the Logs directory

// If the Logs directory exists, delete it, otherwise print a message
if (fs.existsSync(logsDir)) {

  // Create an array with the name of every file in the Logs directory
  const filesToDelete = fs.readdirSync(logsDir);

  // Loop through every file in the directory, print its name then delete it
  for (let i = 0; i < filesToDelete.length; i++) {
    console.log("delete files..."+filesToDelete[i]); // print file name
    fs.unlinkSync(path.join(logsDir, filesToDelete[i])); // Remove file
  }

  // Remove the Logs directory
  fs.rmdirSync(logsDir);
  console.log('Logs directory removed.');
} 
else {
  console.log('Logs directory does not exist.');
}
