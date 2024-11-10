"use client"

import { UserContext } from "@/providers/UserContext";
import axios, { AxiosError, AxiosResponse } from "axios";
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
                <h1 className="text-3xl">Users</h1>
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th className="p-5 border-b">Username</th>
                            <th className="p-5 border-b">E-mail address</th>
                            <th className="p-5 border-b">Full Name</th>
                            <th className="p-5 border-b">Role</th>
                            <th className="p-5 border-b">Enrolled by</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.length > 0 && users.map((user: UserType, key: React.Key) => (
                                <tr key={key}>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.fullname}</td>
                                    <td>{user.role}</td>
                                    <td>{user.enrolledBy || "Nope"}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}