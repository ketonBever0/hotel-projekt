"use client"

import { UserContext } from "@/providers/UserContext";
import Link from "next/link";
import { useContext, useState } from "react";

export default function AuthBlock() {

    const {
        userData,
        logout
    } = useContext(UserContext);

    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    return (
        <div>
            {
                userData ?
                    <div>
                        <button className="btn btn-outline" onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}>{userData.username}</button>
                        {
                            isProfileMenuOpen &&
                            <div className="fixed right-2 bg-accent w-1/3 rounded-lg mt-2 p-4 text-center">
                                <Link href={"/profile"} className="w-full p-2 rounded block hover:bg-primary">Profile</Link>
                                <button className="w-full p-2 rounded block hover:bg-error"
                                onClick={() => {
                                    logout();
                                }}
                                >Kijelentkezés</button>
                            </div>
                        }
                    </div>
                    :
                    <Link href={"/login"} className="btn btn-primary text-slate-200">Bejelentkezés</Link>
            }
        </div>
    );
}