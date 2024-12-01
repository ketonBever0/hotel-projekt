"use client"

import { UserContext } from "@/providers/UserContext";
import axios, { AxiosError, AxiosResponse } from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function UsersPage() {


    const {
        token, userData
    } = useContext(UserContext);

    const [users, setUsers] = useState<Array<UserType>>([]);

    const getUsers = async () => {
        await axios.get("http://localhost:3000/api/auth/user/all", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res: AxiosResponse) => {
                setUsers(res.data);
            })
            .catch((e: AxiosError) => console.log(e));
    }

    useEffect(() => {
        if (userData) {
            getUsers();
        }
    }, [userData])

    return (
        <div>
            <div className="space-y-5 bg-base-100 rounded-lg p-12">
                <div className="flex justify-end">
                    <Link href={"/admin/users/registration"} className="btn">
                        Új dolgozó regisztrálása
                    </Link>
                </div>
                <h1 className="text-3xl text-center">Felhasználók</h1>
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th className="p-5 border-b">Felhasználónév</th>
                            <th className="p-5 border-b">E-mail cím</th>
                            <th className="p-5 border-b">Teljes név</th>
                            <th className="p-5 border-b">Rang</th>
                            <th className="p-5 border-b">Felvette</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.length > 0 && users.map((user: UserType, key: React.Key) => (
                                <tr key={key}>
                                    <td className="px-4">{user.username}</td>
                                    <td className="px-4">{user.email}</td>
                                    <td className="px-4">{user.fullname}</td>
                                    <td className="px-4">{user.role}</td>
                                    <td className="px-4">{user.enrolledBy}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}