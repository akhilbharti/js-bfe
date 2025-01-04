/**
 * @param {Array<Promise>} promises
 * @return {Promise}
 */

function race(promises) {
    return new Promise((resolve, reject) => {
        let isSettled = false;
        promises.forEach(promise => promise.then((value) => {
            if (!isSettled) {
                resolve(value);
                isSettled = true;
            }
        }).catch((err) => {
            if (!isSettled) {
                reject(err);
                isSettled = true;
            }
        }))
    })
}

/*
const promise1 = new Promise((resolve) => setTimeout(resolve, 100, 'First'));
const promise2 = new Promise((_, reject) => setTimeout(reject, 50, 'Error'));
const promise3 = new Promise((resolve) => setTimeout(resolve, 200, 'Third'));

race([promise1, promise2, promise3])
  .then((result) => console.log('Resolved:', result))
  .catch((error) => console.error('Rejected:', error));

  */