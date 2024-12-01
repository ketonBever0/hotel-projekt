"use client"

import DeleteCustomerPrompt from "@/components/admin/customers/DeleteCustomerPrompt";
import { tSuccess } from "@/components/ui/Toasts";
import { UserContext } from "@/providers/UserContext";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";

export default function CustomersPage() {


    const {
        token, userData
    } = useContext(UserContext);

    const [customers, setCustomers] = useState<Array<CustomerType>>([]);

    const getCustomers = async () => {
        setCustomers([]);
        await axios.get("http://localhost:3000/api/auth/customer", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res: AxiosResponse) => {
                setCustomers(res.data);
            })
            .catch((e: AxiosError) => console.log(e));
    }

    useEffect(() => {
        if (userData) {
            getCustomers();
        }
    }, [userData])

    return (
        <div>
            <div className="space-y-5 bg-base-100 rounded-lg p-12">
                <h1 className="text-3xl text-center">Eddigi vendégek</h1>
                <table className="table-auto text-center">
                    <thead>
                        <tr>
                            <th className="p-5 border-b">E-mail cím</th>
                            <th className="p-5 border-b">Teljes név</th>
                            <th className="p-5 border-b">Telefonszám</th>
                            <th className="p-5 border-b">Tiltva?</th>
                            <th className="p-5 border-b">Elfogadta</th>
                            <th className="p-5 border-b">Törlés</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            customers.length > 0 && customers.map((customer: CustomerType, key: React.Key) => (
                                <tr key={key}>
                                    <td className="py-3">{customer.email}</td>
                                    <td className="px-6">{customer.fullname}</td>
                                    <td>{customer.mobile}</td>
                                    <td>{customer.isBanned ? "Igen" : "Nem"}</td>
                                    <td>{customer.acceptedBy || <button className="btn btn-primary"
                                        onClick={async () => {
                                            await axios.put(`http://localhost:3000/api/auth/customer/${customer.id}`, null, {
                                                headers: {
                                                    Authorization: `Bearer ${token}`
                                                }
                                            })
                                                .then((res) => {
                                                    if (res.status == 200) {
                                                        tSuccess(res.data.message);
                                                        getCustomers();
                                                    };
                                                })
                                                .catch((err) => console.log(err));
                                        }}
                                    >Elfogadás</button>}</td>
                                    <td className="flex justify-center">
                                        <DeleteCustomerPrompt customerId={customer.id} update={getCustomers} />
                                    </td>
                                </tr>
                            )
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}