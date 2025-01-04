/**
 * @param {Array<any>} promises - notice that input might contains non-promises
 * @return {Promise<Array<{status: 'fulfilled', value: any} | {status: 'rejected', reason: any}>>}
 */

// using async-await
async function allSettled(promises){
    const result=[]; //need to return array promise

    for(let i=0; i<promises.length;i++){
        try {
            const value = await promises[i];
            result[i]={status:'fulfilled', value}
            
        } catch (reason) {
            result[i]={status:'rejected', reason}
        }
    }

    return result;
}

// using Promises

function allSettled(promises) {
    return new Promise((resolve) => {
      const result = [];
      let completed = 0;
      if (promises.length === 0) { resolve(result) };
  
      promises.forEach((promise, index) => {
        Promise.resolve(promise).then((value) => {
          result[index] = { status: 'fulfilled', value }
        }).catch((reason) => {
          result[index] = { status: 'rejected', reason }
        }).finally(() => {
          completed += 1;
          if (completed === promises.length) {
            resolve(result)
          }
        })
      });
    })
  }


  