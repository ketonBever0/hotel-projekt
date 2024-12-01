"use client"

import { UserContext } from "@/providers/UserContext";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import dateFormat from "dateformat";
import ReactModal from "react-modal";
import ReservationElement from "@/components/admin/reservations/ReservationElement";
import toast from "react-hot-toast";

export default function ReservationsPage() {
    const {
        token, userData
    } = useContext(UserContext);

    const [reservations, setReservations] = useState<Array<ReservationType>>([]);

    const getReservations = async () => {
        await axios.get("http://localhost:3000/api/auth/reservation", {
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
                    <h1 className="text-3xl">Szobafoglalások</h1>
                    <div className="form-control">
                        <label className="label cursor-pointer space-x-4">
                            <span className="label-text">Csak a nem elfogadott vendégek általiak</span>
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
                            <th className="p-5 border-b">Foglalta ekkor</th>
                            <th className="p-5 border-b">Mettől</th>
                            <th className="p-5 border-b">Meddig</th>
                            <th className="p-5 border-b">Szobaszám</th>
                            <th className="p-5 border-b">Ár</th>
                            <th className="p-5 border-b">Vendég</th>
                            <th className="p-5 border-b">Törlés</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reservations.length > 0 && reservations
                                .filter((r) => onlyUnaccepted ? !r.acceptedBy : 1 == 1)
                                .map((reservation: ReservationType, key: React.Key) => (
                                    <ReservationElement reservation={reservation} update={getReservations} key={key} />
                                ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}