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
                            <li><Link href={"/admin/users"}>Dolgozók</Link></li>
                            <li><Link href={"/admin/customers"}>Vendégek</Link></li>
                            <li><Link href={"/admin/reservations"}>Szobafoglalások</Link></li>
                            <li><Link href={"/admin/stats"}>Foglalási statisztikák</Link></li>
                        </ul>
                    </details>
                </li>
            }
        </>
    );
}