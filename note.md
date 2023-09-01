# 笔记 

## 异步编程
* fs文件操作
  ```
  require('fs').readFile('./index.html', (err, data) => {});
  ```
* 数据库操作
* Ajax
  ```
  $.get('/server', (data) => {});
  ```
* 定时器
  ```
  setTimeout(() => {}, 1000);
  ```

  ```
  // Promise 实现形式
  // resolve 成功  函数类型的数据
  // reject 失败 函数类型的数据
  const p = Promise((resolve, reject) => {
    if(some expression) {
      resolve(value)
    }else {
      reject(reason)
    }
  })

  p.then((value) => {
    some expression
  }, (reason) => {
    some expression
  })
  ```

# Promise 的状态
实例对象中的一个属性 「PromiseState」
* pending 未决（初始状态）
* resolved / fullfilled 成功
* rejected 失败

## Promise 对象的值
实例对象中的另一个属性 「PromiseResult」
保存着对象「成功｜失败」的结果
* resolve
* reject