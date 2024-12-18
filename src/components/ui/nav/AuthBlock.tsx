"use client"

import { UserContext } from "@/providers/UserContext";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useContext, useState } from "react";
import { tSuccess } from "../Toasts";

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
                            <div className="fixed right-2 bg-base-100 w-1/3 rounded-lg mt-2 p-4 text-center text-accent">
                                <Link href={"/profile"} className="w-full p-2 rounded block hover:bg-primary transition-all">Profil</Link>
                                <button className="w-full p-2 rounded block hover:bg-error hover:text-black transition-all"
                                onClick={() => {
                                    setIsProfileMenuOpen(false);
                                    logout();
                                    tSuccess("Kijelentkezve!")
                                    redirect("/");
                                }}
                                >Kijelentkezés</button>
                            </div>
                        }
                    </div>
                    :
                    <Link href={"/login"} className="btn btn-primary text-slate-200">Dolgozói belépés</Link>
            }
        </div>
    );
}