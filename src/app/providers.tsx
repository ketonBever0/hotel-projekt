"use client"

import { UserProvider } from "@/providers/UserContext";

export default function Providers({ children }: any) {
    return (
        <div>
            <UserProvider>
                {children}
            </UserProvider>
        </div>
    );
}