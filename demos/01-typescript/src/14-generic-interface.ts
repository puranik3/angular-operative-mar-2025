// interface IProduct {
//     name: string;
//     price: number;
// }

// interface IProductDetailedName {
//     name: {
//         manufacturer: string;
//         baseName: string;
//     };
//     price: number;
// }

// interface IProductDetailedNameAndPrice {
//     name: {
//         manufacturer: string;
//         baseName: string;
//     };
//     price: {
//         value: number;
//         gst: number;
//     };
// }

// generic interface
interface IProduct<NameType, PriceType> {
    name: NameType;
    price: PriceType;
}

interface DetailedName {
    manufacturer: string;
    baseName: string;
}

interface DetailedPrice {
    value: number,
    gst: number
}

//  IProduct<string, number> is equivalent to IProduct and is an actual (concrete) type
const pen: IProduct<string, number> = {
    name: "Pen",
    price: 1.5,
};

const pencil: IProduct<DetailedName, number> = {
    name: {
        manufacturer: "Faber Castell",
        baseName: "Dark",
    },
    price: 5,
};

const eraser: IProduct<DetailedName, DetailedPrice> = {
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
