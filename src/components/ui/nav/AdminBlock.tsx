"use client"

import { UserContext } from "@/providers/UserContext";
import Link from "next/link";
import { useContext } from "react";

export default function AdminBlock() {

    const { userData } = useContext(UserContext);

    return (
        <>
            {
                userData &&
                <li>
                    <details>
                        <summary>Admin</summary>
                        <ul className="p-2">
                            <li><Link href={"/admin/users"}>Users</Link></li>
                            <li><Link href={"/admin/customers"}>Customers</Link></li>
                            <li><Link href={"/admin/reservations"}>Reservations</Link></li>
                        </ul>
                    </details>
                </li>
            }
        </>
    );
}