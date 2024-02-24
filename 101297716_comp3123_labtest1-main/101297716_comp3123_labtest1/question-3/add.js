// Import mdodules
const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, 'Logs'); // Path to the Logs directory

// Create the Logs directory if it does not exist
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
    console.log('Logs directory created.');
}
  
// Change the current process working directory to the Logs directory
process.chdir(logsDir);
  
// Create 10 log files and write some text into them
for (let i = 0; i < 10; i++) {
    const fileName = `log${i}.txt`;
    const fileText = `This is log file ${i}.`;
  
    fs.writeFileSync(fileName, fileText);
    console.log(fileName);
}
  