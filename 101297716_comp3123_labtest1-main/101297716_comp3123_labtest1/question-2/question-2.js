function resolvedPromise() {

    return new Promise((resolve) => {
        setTimeout(() => {
            let success = {'message': 'delayed success!'}
            resolve(success);
        }, 500);

    });

}

function rejectedPromise() {
    return new Promise((reject) => {
        setTimeout(() => {
            let error = {'error': 'delayed exception!'}
            reject(error);
        }, 500);
    });
}

resolvedPromise()
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });

rejectedPromise()
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });