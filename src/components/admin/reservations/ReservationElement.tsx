"use client"

import dateFormat from "dateformat";
import { useState } from "react";
import ReactModal from "react-modal";

export default function ReservationElement({ reservation }: { reservation: ReservationType }) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (


        <tr>
            <ReactModal style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.75)'
                },
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: "black"
                },
            }}
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                ariaHideApp={false}
            >
                <div className="space-y-4">
                    <h2 className="text-center text-2xl">{reservation.email}</h2>
                    <table className="space-y-5 bg-base-100 rounded-lg p-12">
                        <tbody>
                            <tr>
                                <td className="p-5 border-r text-lg">Teljes név</td>
                                <td className="p-5">{reservation.fullname}</td>
                            </tr>
                            <tr>
                                <td className="p-5 border-r text-lg">Telefonszám</td>
                                <td className="p-5">{reservation.mobile}</td>
                            </tr>
                            <tr>
                                <td className="p-5 border-r text-lg">Tiltva?</td>
                                <td className="p-5">{reservation.isBanned ? "Igen" : "Nem"}</td>
                            </tr>
                            <tr>
                                <td className="p-5 border-r text-lg">Elfogadta</td>
                                <td className="p-5">{reservation.acceptedBy ? reservation.acceptedBy : <button className="btn btn-outline">Elfogadás</button>
                                }</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </ReactModal>
            <td>{dateFormat(reservation.requestedAt, "yyyy. mm. dd.")}</td>
            <td>{dateFormat(reservation.startDate, "yyyy. mm. dd.")}</td>
            <td>{dateFormat(reservation.endDate, "yyyy. mm. dd.")}</td>
            <td>{reservation.roomNumber}</td>
            <td><button className="btn btn-outline"
                onClick={() => { setIsModalOpen(true) }}
            >{reservation.email}</button></td>
        </tr>

    );
}