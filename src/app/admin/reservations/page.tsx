"use client"

import { UserContext } from "@/providers/UserContext";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import dateFormat from "dateformat";
import ReactModal from "react-modal";
import ReservationElement from "@/components/admin/reservations/ReservationElement";

export default function ReservationsPage() {
    const {
        token, userData
    } = useContext(UserContext);

    const [reservations, setReservations] = useState<Array<ReservationType>>([]);

    const getReservations = async () => {
        await axios.get("http://localhost:3000/api/reservation", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res: AxiosResponse) => {
                setReservations(res.data);
            })
            .catch((e: AxiosError) => console.log(e));
    }

    useEffect(() => {
        if (userData) {
            getReservations();
        }
    }, [userData])

    const [onlyUnaccepted, setOnlyUnaccepted] = useState(false);

    return (
        <div>



            <div className="space-y-5 bg-base-100 rounded-lg p-12">
                <div className="flex justify-center gap-8">
                    <h1 className="text-3xl">Reservations</h1>
                    <div className="form-control">
                        <label className="label cursor-pointer space-x-4">
                            <span className="label-text">Remember me</span>
                            <input type="checkbox"
                                className="checkbox bg-red-50"
                                id="onlyUnaccepted"
                                name="onlyUnaccepted"
                                checked={onlyUnaccepted}
                                onChange={(e) => { setOnlyUnaccepted(e.target.checked) }} />
                        </label>
                    </div>
                </div>
                <table className="table-auto text-center">
                    <thead>
                        <tr>
                            <th className="p-5 border-b">Requested At</th>
                            <th className="p-5 border-b">Start Date</th>
                            <th className="p-5 border-b">End Date</th>
                            <th className="p-5 border-b">Room</th>
                            <th className="p-5 border-b">By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reservations.length > 0 && reservations
                                .filter((r) => onlyUnaccepted ? !r.acceptedBy : 1 == 1)
                                .map((reservation: ReservationType, key: React.Key) => (
                                    <ReservationElement reservation={reservation} key={key} />
                                ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}