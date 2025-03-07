type Person = {
    name: string;
    readonly age: number;
    spouse?: string;
};

let john: Person;

// readonly properties can't be changed once initial value is assigned
john = {
    name: "John",
    age: 32,
    spouse: "Jane",
};
// john = 100;

let jane: Person = {
    name: "Jane",
    age: 28,
};

jane.spouse = "John";
// jane.xyz = "sds" ; // error

john.name = "Jonathan Doe";
// john.age++; // error -age is readonly

export {};
