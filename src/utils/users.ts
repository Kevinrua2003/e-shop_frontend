import { Role, User } from "@/UI/products/types/types";


export const users: User[] = [
    {
        id: "u1",
        name: "Name1",
        email: "name1@gmail.com",
        hashedPassword: "pass",
        role: Role.ADMIN
    },
    {
        id: "u2",
        name: "Name2",
        email: "name2@gmail.com",
        hashedPassword: "pass",
        role: Role.USER
    },
]