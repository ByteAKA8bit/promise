/**
 * 封装一个函数 readFiles 读取文件内容
 * 参数：path 文件路径
 * 返回：Promise对象
 */
"use strict";

function readFiles(path){
  return new Promise((resolve, reject) => {
    // 读取文件
    require('fs').readFile(path, (err, data) => {
      if(err) {
        reject(err);
      }else {
        resolve(data)
      }
    });
  });
}

readFiles('./resource/content.txt')
  .then(value => {
    console.log(value.toString());
  }, reason => {
    console.log(reason);
  })