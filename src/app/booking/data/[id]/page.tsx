"use client"

import axios from "axios";
import dateFormat from "dateformat";
import React from "react";
import { useEffect, useState } from "react"

export default function Page({ params }: { params: Promise<{ id: string }> }) {

    const { id } = React.use(params);

    const [reservationData, setReservationData] = useState<DoneReservationType | null>(null);

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
                {
                    reservationData &&
                    <>
                        <h2 className="text-center text-xl">Köszönjük a foglalást!</h2>
                        {
                            !reservationData.isAccepted &&
                            <p className="text-center">Mivel még új ügyfél vagy, várnod kell az elfogadásra.<br />Erről hamarosan értesítünk...</p>
                        }

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
                    </>
                }

            </div>


        </div>
    );
}