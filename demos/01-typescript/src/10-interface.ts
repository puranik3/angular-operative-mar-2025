interface IPerson {
    name: string;
    age: number;
    spouse?: string;
    celebrateBirthday: (inc: number) => void;
}

// Object type can be specified through interface
let john: IPerson;

john = {
    name: "John",
    age: 30,
    // spouse: 'Jane',
    celebrateBirthday: function (inc: number) {
        this.age += inc;
    },
};

class Person implements IPerson {
    public name: string;
    public age: number;
    public spouse?: string;

    constructor(name: string, age: number, spouse?: string) {
        this.name = name;
        this.age = age;

        if (spouse) {
            this.spouse = spouse;
        }
    }

    celebrateBirthday(inc: number) {
        this.age += inc;
    }
}

// export { IPerson as default };

export default IPerson;
