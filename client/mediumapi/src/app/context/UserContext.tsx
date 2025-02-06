"use client";

import { createContext, useState, ReactNode, useEffect } from "react";

interface User {
    id: number;
    email: string;
    username: string;
    userImg: string;
    bgImg: string;
}

interface UserContextProps {
    user: User | null;
    setUser: (user: User | null) => void;
}

const initialValue: UserContextProps = {
    user: null,
    setUser: () => {},
};

export const UserContext = createContext<UserContextProps>(initialValue);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const userJSON = localStorage.getItem("mediumapi:user");
        if (userJSON) {
            setUser(JSON.parse(userJSON));
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
