/* 67. create your own Promise

const promise = new MyPromise((res,rej)=>{res(4)})
1.promise.then((val)=>consol.log(val)) //4
2. promise
  .then((value) => value + 1)
  .then((value) => console.log(value)); // 5
*/

const STATES_ENUM = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected',
};
class MyPromise {
    constructor(executor) {
        this.state = STATES_ENUM.PENDING;
        this.handler = [];
        this.result = undefined;
        try {
            executor(this._resolve.bind(this), this._reject.bind(this))
        } catch (error) {
            this._reject(error)
        }
    }
    _resolve(value) {
        if (this.state !== STATES_ENUM.PENDING) {
            return;
        }
        if (value instanceof MyPromise) {
            return value.then(this._resolve.bind(this), this._reject.bind(this));
        }

        this.state = STATES_ENUM.FULFILLED;
        this.result = value;
        this._executeHandler();
    }

    _reject(error) {
        if (this.state !== STATES_ENUM.PENDING) {
            return;
        }

        this.state = STATES_ENUM.REJECTED;
        this.result = error;
        this._executeHandler();
    }

    then(onFulFilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            this.handler.push({
                fulfilled: (value) => {
                    if (typeof onFulFilled !== 'function') {
                        resolve(value);
                        return;
                    }
                    try {
                        resolve(onFulFilled(value));
                    } catch (error) {
                        reject(error);
                    }
                },
                rejected: (error) => {
                    if (typeof onRejected !== 'function') {
                        reject(error);
                        return;
                    }

                    try {
                        resolve(onRejected(error))
                    } catch (error) {
                        reject(error);
                    }
                }
            })
            this._executeHandler();
        })
    }

    _executeHandler() {
        if (this.state === STATES_ENUM.PENDING) {
            return;
        }
        this.handler.forEach(handle => {
            setTimeout(() => {
                handle[this.state](this.result)
            }, 0);
        })
        this.handler = [];
    }

    catch(onRejected) {
        return this.then(undefined, onRejected);
    }

    static resolve(value) {
        // your code here
        return new MyPromise((resolve, reject) => {
            resolve(value);
        })
    }

    static reject(value) {
        // your code here
        return new MyPromise((resolve, reject) => {
            reject(value);
        })
    }
}
