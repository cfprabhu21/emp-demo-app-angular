interface Phone {
    phone: string;
}

export interface Iemployee {
    name: string;
    address: string;
    gender: string;
    role: string;
    dateOfBirth: Date;
    phones: Phone[];
    id: number;
}
