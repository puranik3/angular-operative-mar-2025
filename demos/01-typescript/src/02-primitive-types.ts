// inferred to be string
// let message = "Hello, world!";
let message; // any type
message = "hello, world!";
message = 10;
// Try to avoid any type

let greeting: string;
greeting = "Good morning";

let usdToInr /*: number */ = 87.5;

let isMarch = true;
// isMarch = 100; // error

// on its own null type is not very useful because it can be assigned only null value
let project: null = null;
// project = 100; // error

// let project2: undefined;

export {};
