import IHuman from "./10-interface";

interface IEmployee extends IHuman {
    role: string;
    dept: string;

    promote: (newRole: string) => void;
}

export {};
