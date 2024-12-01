import { tSuccess } from "@/components/ui/Toasts";
import { UserContext } from "@/providers/UserContext";
import axios from "axios";
import { useContext, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { TiDelete } from "react-icons/ti";

export default function DeleteCustomerPrompt({ customerId, update }: { customerId: number, update: () => Promise<void> }) {

    const { token } = useContext(UserContext);

    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

    return (
        <>
            {!isDeleteConfirmOpen ?
                <MdDeleteForever size={30} className="mt-2 cursor-pointer" color="red" onClick={() => { setIsDeleteConfirmOpen(true) }} />
                : <div className="flex justify-center items-center">
                    <FaCheckCircle size={20} className="mt-2 cursor-pointer" color="green" onClick={async () => {
                        await axios.delete(`http://localhost:3000/api/auth/customer/${customerId}`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        })
                        .then((res) => {
                            if (res.status == 200) {
                                setIsDeleteConfirmOpen(false);
                                tSuccess("Vendég törölve!");
                                update()
                            };
                        })
                        .catch((err) => console.log(err));
                    }} />
                    <TiDelete size={30} className="mt-2 cursor-pointer" color="red" onClick={() => setIsDeleteConfirmOpen(false)} />
                </div>
            }
        </>
    )
}