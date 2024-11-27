"use client"

import axios from "axios";
import dateFormat from "dateformat";
import React from "react";
import { useEffect, useState } from "react"

export default function Page({ params }: { params: Promise<{ id: string }> }) {

    const { id } = React.use(params);

    const [reservationData, setReservationData] = useState<OneReservationType | null>(null);

    const getReservationData = async () => {
        await axios.get(`http://localhost:3000/api/reservation/${id}`)
            .then((res) => {
                setReservationData(res.data);
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getReservationData();
    }, []);


    return (

        <div>

            <div className="space-y-6 bg-primary p-16 rounded-xl">
                <h2 className="text-center text-xl">Köszönjük a rendelést!</h2>

                {
                    reservationData &&
                    <table className="table">
                        <tbody>
                            <tr>
                                <th><b>Szobaszám</b></th>
                                <td>{reservationData.roomNumber}</td>
                            </tr>
                            <tr>
                                <th><b>Időtartam</b></th>
                                <td>{dateFormat(reservationData.startDate, "yyyy. mm. dd")} - {dateFormat(reservationData.endDate, "yyyy. mm. dd.")}</td>
                            </tr>
                            <tr>
                                <th><b>Kezdeti ár</b></th>
                                <td>{reservationData.price} FT</td>
                            </tr>
                        </tbody>
                    </table>
                }

            </div>


        </div>
    );
}