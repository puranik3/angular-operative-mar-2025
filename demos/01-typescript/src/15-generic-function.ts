// map implementation

type MapperFunction<T, U> = (x: T) => U;

function map<T, U>(arr: T[], mapper: MapperFunction<T, U>) {
    let result: U[] = [];

    for (let i = 0; i < arr.length; ++i) {
        const transformedItem = mapper(arr[i]);
        result.push(transformedItem);
    }

    return result;
}

const arr = [1, 2, 3, 4, 5, 6];

// you can be explicit and tell T = number, U = number
// const result = map<number, number>(arr, (x) => x * x); // [1, 4, 9, 16, 25, 36]

// Or let TS infer T, U from the context of your function call
const result = map<number, number>(arr, (x) => x * x); // [1, 4, 9, 16, 25, 36]
console.log(result);

const months = ["January", "February", "March", "April", "May", "June"];

// T = string, U = number (since string.length is a number in JS)
const monthLengths = map(months, (month) => month.length);
console.log(monthLengths);
