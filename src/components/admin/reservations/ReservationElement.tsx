"use client"

import { tPromise, tSuccess } from "@/components/ui/Toasts";
import { UserContext } from "@/providers/UserContext";
import axios, { AxiosResponse } from "axios";
import dateFormat from "dateformat";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import ReactModal from "react-modal";

export default function ReservationElement({ reservation, update }: {
    reservation: ReservationType, update: () => Promise<void>
}) {

    const { token } = useContext(UserContext);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const acceptCustomer = async () => {
        await axios.put(`http://localhost:3000/api/auth/customer/${reservation.customerId}`, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                if (res.status == 200) {
                    tSuccess(res.data.message);
                    update()
                };
            })
            .catch((err) => console.log(err));
    }

    const [isPriceEditOpen, setIsPriceEditOpen] = useState(false);
    const [editPrice, setEditPrice] = useState(reservation.price);

    const changePrice = async () => {
        await axios.patch(`http://localhost:3000/api/auth/reservation/${reservation.id}`, { price: editPrice == 0 ? null : editPrice }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                if (res.status == 200) {
                    update();
                    setIsPriceEditOpen(false);
                }
            })
            .catch((e) => console.log(e));
    }

    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

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
                                <td className="p-5">{reservation.acceptedBy ? reservation.acceptedBy : <button className="btn btn-outline" onClick={() => acceptCustomer()}>Elfogadás</button>
                                }</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </ReactModal>

            <td className="py-4">{dateFormat(reservation.requestedAt, "yyyy. mm. dd.")}</td>
            <td className="px-4">{dateFormat(reservation.startDate, "yyyy. mm. dd.")}</td>
            <td className="px-4">{dateFormat(reservation.endDate, "yyyy. mm. dd.")}</td>
            <td>{reservation.roomNumber}</td>
            <td>{
                !isPriceEditOpen ?
                    <button className="cursor-text btn btn-ghost"
                        onClick={() => {
                            setEditPrice(reservation.price);
                            setIsPriceEditOpen(true);
                        }}
                    >
                        {reservation.price != null && `${reservation.price} Ft`}
                    </button>
                    :
                    <>
                        <div className="flex justify-center items-center">
                            {/* <button className="btn btn-error w-1/3" onClick={() => setIsPriceEditOpen(false)}>Mégse</button> */}
                            <TiDelete size={30} className="cursor-pointer" color="red" onClick={() => { setIsPriceEditOpen(false); }} />
                            <input type="text" name="price" id="price"
                                className="w-1/3 h-6 text-black text-center"
                                value={editPrice?.toString()}
                                onChange={(e) => setEditPrice(e.target.value != "" ? parseInt(e.target.value) : 0)}
                            />
                            <FaCheckCircle size={23} className="cursor-pointer ml-2" color="green"
                                onClick={() => {
                                    toast.promise(
                                        changePrice(), { loading: "Ár frissítése", success: "Frissítve", error: "Hiba!" }
                                    )
                                }}
                            />
                            {/* <button className="btn btn-primary w-1/3" onClick={() => changePrice()}>Mentés</button> */}
                        </div>
                    </>
            }
            </td>
            <td className="px-4">{
                reservation.customerId == null ?
                    <p className="text-sm">(Törölt vendég)</p>
                    :
                    <button className="btn btn-outline"
                        onClick={() => { setEditPrice(reservation.price); setIsModalOpen(true) }}
                    >{reservation.email}</button>
            }</td>
            <td className="px-4">
                {!isDeleteConfirmOpen ?
                    <MdDeleteForever size={30} className="mt-2 cursor-pointer" color="red" onClick={() => { setIsDeleteConfirmOpen(true) }} />
                    : <div className="flex justify-center items-center">
                        <FaCheckCircle size={22} className="mt-2 cursor-pointer" color="green" onClick={async () => {
                            await axios.delete(`http://localhost:3000/api/auth/reservation/${reservation.id}`, {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            })
                                .then((res) => {
                                    if (res.status == 200) {
                                        setIsDeleteConfirmOpen(false);
                                        update();
                                        tSuccess(res.data.message);
                                    };
                                })
                                .catch((err) => console.log(err));
                        }} />
                        <TiDelete size={30} className="mt-2 cursor-pointer" color="red" onClick={() => setIsDeleteConfirmOpen(false)} />
                    </div>
                }
            </td>
        </tr>

    );
}