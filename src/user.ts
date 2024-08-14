export type User = {
    id: number;
    name: string;
    email: string;
    dateOfBirth: string; // ISO format date string
};

let users: User[] = [];
let nextId = 1;

export const getUsers = () => users;

export const getUserById = (id: number) => users.find((user) => user.id === id);

export const createUser = (user: Omit<User, 'id'>) => {
    const newUser = { ...user, id: nextId++ };
    users.push(newUser);
    return newUser;
};

export const updateUser = (id: number, updatedUser: Omit<User, 'id'>) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
        users[index] = { id, ...updatedUser };
        return users[index];
    }
    return null;
};

export const deleteUser = (id: number) => {
    users = users.filter((user) => user.id !== id);
};
