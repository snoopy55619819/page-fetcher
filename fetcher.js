const request = require('request');
const fs = require('fs');
const readline = require('readline');

const args = process.argv;
const url = args[2];
const path = args [3];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const getRequest = (url, path) => {
  request(url, (error, response, body) => {
    doesPathExist(body, path);
  });
};

const doesPathExist = (body, path) => {
  fs.exists(path, (exists) => {
    if (exists) {
      rl.question("Path already exists, would you like to overwrite?(y/n) ", (data) => {
        if (data === 'y') {
          console.log('File exists and user wants to overwrite');
          writeToFile(body, path);
        } else {
          console.log('User does not want to overwrite. RUNNNNN');
        }
        rl.close();
      });
    } else {
      console.log('File does not exist...so make one')
      writeToFile(body, path);
    }
  })
};


const writeToFile = (body, path) => {
  fs.writeFile(path, body, err => {
    // if (err) {
    //   console.error(err)
    //   return
    // }
    //file written successfully
    console.log('File written successfully!!!')
    printDownloadStatus(body, path);
  })
};

const printDownloadStatus = (body, path) => {
  const fileSize = body.trim().split(" ").join("").length;
  console.log(`Downloaded and saved ${fileSize} bytes to ${path}`);
};

getRequest(url, path);