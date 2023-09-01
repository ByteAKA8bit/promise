// 读取resource文件夹下内容
"use strict";

const fs = require('fs');

// 回调函数形式
// fs.readFile('./resource/content.txt', (err, data) => {
//   if(err) {
//     throw err;
//   }
//   console.log(data.toString())
// });

// promise形式
let p = new Promise((resolve, rejects) => {
  fs.readFile('./resource/content.txt', (err, data) => {
    if(err){
      rejects(err);
    }
    resolve(data);
  });
});

p.then(value => {
  console.log(value.toString());
}, reason => {
  console.log(reason)
});
