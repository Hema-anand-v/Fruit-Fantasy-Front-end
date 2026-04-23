export interface User {
    id?: number;
    fullName: string;
    email: string;
    phone: string;
    gender: string;
    address: string;
    state: string;
    dob: string;
    username: string;
    password: string;
    role: "admin" | "user";
  }
  