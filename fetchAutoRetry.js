/**
 * @param {() => Promise<any>} fetcher
 * @param {number} maximumRetryCount
 * @return {Promise<any>}
 */

function fetchWithAutoRetry(fetcher, maximumRetryCount) {
    return new Promise((resolve, reject) => {
        function doFetch(attempt) {
            fetcher().then((data) => {
                resolve(data)
            }).catch((error) => {
                if (attempt < maximumRetryCount) {
                    doFetch(attempt + 1);
                } else {
                    reject(error);
                }
            })
        }
        doFetch(0);
    })
}

// async-await attempt
async function fetchWithAutoRetry(fetcher, maximumRetryCount) {
    let retryCount = 0;
    while (retryCount <= maximumRetryCount) {
        try {
            const result = await fetcher();
            return result;
        } catch (err) {
            retryCount += 1;
            if (retryCount > maximumRetryCount) {
                throw err;
            }
        }
    }
}