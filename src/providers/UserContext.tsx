"use client"

import axios, { AxiosError, AxiosResponse } from "axios";
import { createContext, useEffect, useState } from "react"

export const UserContext = createContext<any | null>(null);

export const UserProvider = ({ children }: any) => {

    const [userData, setUserData] = useState<UserType | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const [refreshToken, setRefreshToken] = useState(false);

    useEffect(() => {
        const sessionToken: string | null = sessionStorage.getItem("access");
        if (sessionToken) {
            setToken(sessionToken);
        }
    }, [refreshToken])

    const updateToken = () => setRefreshToken(!refreshToken);

    useEffect(() => {
        if (token) {
            getUserData();
        }

    }, [token])


    const getUserData = async () => {
        await axios.get("http://localhost:3000/api/auth/user/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res: AxiosResponse) => {
                // console.log(res.data);
                if (res.status == 200) setUserData(res.data);
            })
            .catch((e: AxiosError) => {
                if (e.response?.status == 403) {
                    logout();
                }
                console.log(e.response?.data);
            });
    }

    const logout = () => {
        sessionStorage.removeItem("access");
        setToken(null);
        setUserData(null);
    }




    return <UserContext.Provider value={{
        userData, setUserData,
        getUserData,
        token, setToken,
        logout,
        updateToken
    }}>{children}</UserContext.Provider>
}

