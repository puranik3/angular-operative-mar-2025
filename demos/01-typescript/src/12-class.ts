class Person {
    // public name: string;
    // public readonly age: number;
    // private spouse?: string;

    constructor(
        public name: string,
        public age: number,
        private spouse?: string
    ) {
        // this.name = name;
        // this.age = age;
        // if (spouse) {
        //     this.spouse = spouse;
        // }
    }

    celebrateBirthday(inc: number) {
        this.age += inc;
    }
}

const john = new Person("John", 30);
const jane = new Person("John", 30, "John");

console.log(john);
console.log(jane);

export {};
