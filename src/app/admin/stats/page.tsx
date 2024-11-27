"use client"

import { UserContext } from "@/providers/UserContext";
import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useContext, useEffect, useState } from "react";

export default function ReservationStats() {
    const {
        token, userData
    } = useContext(UserContext);

    const [reservationStats, setReservationStats] = useState<Array<ReservationStatType>>([]);

    const getReservationStats = async () => {
        await axios.get("http://localhost:3000/api/auth/reservation/stats", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res: AxiosResponse) => {
                setReservationStats(res.data);
            })
            .catch((e: AxiosError) => console.log(e));
    }

    useEffect(() => {
        if (userData) {
            getReservationStats();
        }
    }, [userData])


    return (
        <div>



            <div className="space-y-5 bg-base-100 rounded-lg p-12">
                <div className="flex justify-center gap-8">
                    <h1 className="text-3xl">Szobafoglalási statisztikák</h1>
                </div>
                <table className="table-auto text-center">
                    <thead>
                        <tr>
                            <th className="p-5 border-b">Szobatípus</th>
                            <th className="p-5 border-b">Hányszor</th>
                            <th className="p-5 border-b">Max ár</th>
                            <th className="p-5 border-b">Átlagár</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reservationStats.length > 0 &&
                            reservationStats.map((data: ReservationStatType, key: React.Key) => (
                                <tr key={key}>
                                    <td className="p-5 border-b">{data.name}</td>
                                    <td className="p-5 border-b">{data.quantity}</td>
                                    <td className="p-5 border-b">{data.maxPrice}</td>
                                    <td className="p-5 border-b">{data.averagePrice}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}