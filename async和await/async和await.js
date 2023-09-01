const fs = require("fs");
const util = require("util");
const mineReadFile = util.promisify(fs.readFile);

// 使用回调函数
// fs.readFile('./resource/1', (err, data1) => {
//   if (err) throw err;
//   fs.readFile('./resource/2', (err, data2) => {
//     if (err) throw err;
//     fs.readFile('./resource/3', (err, data3) => {
//       if (err) throw err;
//       console.log(data1 + data2 + data3);
//     });
//   });
// });

async function main() {
  try {
    let data1 = await mineReadFile("./resource/1");
    let data2 = await mineReadFile("./resource/2");
    let data3 = await mineReadFile("./resource/3.txt");
    console.log(data1 + data2 + data3);
  } catch (error) {
    console.log(error.code);
  }
}

main();
