class Promise {
  // 构造方法
  constructor(executor) {
    // 执行器函数 同步调用
    // 添加属性
    this.PromiseState = "pending";
    this.PromiseResult = null;
    this.callbacks = [];
    // 保存this
    const _this = this;

    function resolve(data) {
      if (_this.PromiseState === "pending") {
        // 修改对象的状态 promiseState
        _this.PromiseState = "fulfilled";
        // 修改对象的结果值 promiseResult
        _this.PromiseResult = data;
        // 执行回调
        setTimeout(() => {
          _this.callbacks.forEach((element) => {
            element.onResolved(data);
          });
        });
      } else {
        return _this;
      }
    }

    function reject(data) {
      if (_this.PromiseState === "pending") {
        _this.PromiseState = "rejected";
        _this.PromiseResult = data;
        setTimeout(() => {
          _this.callbacks.forEach((elemet) => {
            elemet.onRejected(data);
          });
        });
      } else {
        return _this;
      }
    }

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  // then 方法
  then(onResolved, onRejected) {
    const _this = this;
    // 判断回调函数参数
    if (typeof onResolved !== "function") {
      onResolved = (value) => value;
    }

    if (typeof onRejected !== "function") {
      onRejected = (reason) => {
        throw reason;
      };
    }

    return new Promise((resolve, reject) => {
      // 封装函数
      function callback(type) {
        try {
          let result = type(_this.PromiseResult);
          if (result instanceof Promise) {
            result.then(
              (value) => {
                resolve(value);
              },
              (reason) => {
                reject(reason);
              }
            );
          } else {
            // 结果的对象状态为成功
            resolve(result);
          }
        } catch (error) {
          reject(error);
        }
      }

      if (this.PromiseState === "fulfilled") {
        // 获取回调函数的执行结果
        setTimeout(() => {
          callback(onResolved);
        });
      }

      if (this.PromiseState === "rejected") {
        setTimeout(() => {
          callback(onRejected);
        });
      }

      if (this.PromiseState === "pending") {
        // 保存回调函数
        this.callbacks.push({
          onResolved: function () {
            // 执行成功的回调函数
            callback(onResolved);
          },
          onRejected: function () {
            // 执行失败的回调函数\
            callback(onRejected);
          },
        });
      }
    });
  }

  // catch 方法
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  // resolve 方法
  static resolve(value) {
    return new Promise((resolve, reject) => {
      // 更改状态
      if (value instanceof Promise) {
        value.then(
          (v) => {
            resolve(v);
          },
          (r) => {
            reject(r);
          }
        );
      } else {
        // 状态设置为成功
        resolve(value);
      }
    });
  }

  // reject 方法
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  }

  // all 方法
  static all(promises) {
    let count = 0;
    let array = [];
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(
          (value) => {
            // 此时对象状态为成功
            count++;
            array[i] = value;
            if (count === promises.length) {
              // 修改状态
              resolve(array);
            }
          },
          (reason) => {
            reject(reason);
          }
        );
      }
    });
  }
  
  // race 方法
  static race(promises) {
    return new Promise((resolve, reject) => {
      for (let index in promises) {
        promises[index].then(
          (value) => {
            resolve(value);
          },
          (reason) => {
            reject(reason);
          }
        );
      }
    });
  }
}
