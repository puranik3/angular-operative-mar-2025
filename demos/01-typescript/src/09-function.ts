// Syntax 1 - while creating the function we define the data type
function sum(x: number, y: number) /*: number*/ {
    // #1
    return x + y;
}

const multiply = function (x: number, y: number) {
    // #2
    return x * y;
};

const subtract = (x: number, y: number) => {
    // #3
    return x - y;
};

// Syntax 2 - give the data type separately (works with only #2 an #3)
type BinaryFunction = (a: number, b: number) => number;
const divide: BinaryFunction = (x, y) => {
    const result = x / y;
    return result;
};

const remainder: BinaryFunction = (a, b) => a % b;

// void means we do not care about the return type
type AjaxCallback = (response: string) => void;

// callback is a reference to the passed method
function ajax(url: string, callback: AjaxCallback) {
    // do some call to the backend
    // ....
    // we get response
    let response: string = "Response from backend";

    callback(response);
}

// callback is a reference to the passed method
ajax("https://example.com/ads", (response) => {
    console.log(response);
    return "Ok";
});
