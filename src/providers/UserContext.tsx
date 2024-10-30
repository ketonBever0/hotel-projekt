"use client"

import axios from "axios";
import { headers } from "next/headers";
import { createContext, useState } from "react"

const UserContext = createContext({});

export const UserProvider = ({children}: any) => {

    const [userData, setUserData] = useState<UserType | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const getUserData = async () => {
        const req = await axios.get("localhost:3000/api/user/me", {headers: {
            Authorization: `Bearer ${token}`
        }});
        if(req.status == 200) setUserData(req.data.user);
        else console.log(req.data);
    }





    return <UserContext.Provider value={{
        userData, setUserData,
        getUserData,
        token, setToken
    }}>{children}</UserContext.Provider>
}

