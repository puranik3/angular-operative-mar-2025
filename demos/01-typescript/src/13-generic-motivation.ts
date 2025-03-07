interface IProduct {
    name: string;
    price: number;
}

interface IProductDetailedName {
    name: {
        manufacturer: string;
        baseName: string;
    };
    price: number;
}

interface IProductDetailedNameAndPrice {
    name: {
        manufacturer: string;
        baseName: string;
    };
    price: {
        value: number;
        gst: number;
    };
}

const pen: IProduct = {
    name: "Pen",
    price: 1.5,
};

const pencil: IProductDetailedName = {
    name: {
        manufacturer: "Faber Castell",
        baseName: "Dark",
    },
    price: 5,
};

const eraser: IProductDetailedNameAndPrice = {
    name: {
        manufacturer: "Nataraj",
        baseName: "White",
    },
    price: {
        value: 10,
        gst: 2,
    },
};

export {};
