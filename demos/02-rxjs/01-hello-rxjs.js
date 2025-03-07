// import in Node JS
const { Observable } = require("rxjs");

const date$ = new Observable(
    (observer) => {
        let counter = 0;

        console.log('lambda called')

        const id = setInterval(() => {
            console.log("ticking...");
            observer.next(counter);
            ++counter;
        }, 1000);

        setTimeout(() => {
            observer.complete();
            clearInterval(id);
        }, 15000);

        return {
            unsubscribe() {
                clearInterval(id);
            }
        }
    }
);

const subscription = date$.subscribe(
    { // observer object
        next(counter) {
            console.log(counter);
        },
        complete() {
            console.log('ok, no more evnts');
        },
        error(err) {
            console.log(err.message);
        }
    }
);

setTimeout(() => {
    subscription.unsubscribe();
}, 10000);