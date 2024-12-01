"use client"

import { useContext, useState } from "react"
import axios, { AxiosError, AxiosResponse } from "axios";
import { tError, tSuccess } from "@/components/ui/Toasts";
import { redirect, useRouter } from "next/navigation";
import { UserContext } from "@/providers/UserContext";

export default function Registration() {

    const router = useRouter();

    const { token } = useContext(UserContext);

    const [formData, setFormData] = useState({
        fullname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleFormChange = (e: any) => {
        setFormData((prev) => (
            {
                ...prev,
                [e.target.name]: e.target.value
            }
        ))
    }

    const submit = async () => {
        if (formData.password != formData.confirmPassword) tError("Jelszó megerősítés hibás!");
        else
            await axios.post("http://localhost:3000/api/auth/user/registration", formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res: AxiosResponse) => {
                    if (res.status == 201) {
                        tSuccess(res.data.message);
                        router.push("/admin/users");
                    };
                })
                .catch((e) => {
                    tError(e.response?.data?.message);
                });
    }

    return (
        <div /* className="flex justify-center items-center" */>

            <div className="w-full max-w-md p-8 rounded-lg shadow-md bg-base-100">

                <h1 className="text-2xl font-semibold text-center mb-6">Új dolgozó</h1>

                {/* <form className="flex flex-col align-center"> */}

                <div className="flex-col align-center space-y-6 px-4 text-center">
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Teljes név</span>
                            {/* <span className="label-text-alt">Top Right label</span> */}
                        </div>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs"
                            name="fullname"
                            value={formData.fullname}
                            onChange={(e) => handleFormChange(e)}
                        />
                        {/* <div className="label">
                        <span className="label-text-alt">Bottom Left label</span>
                        <span className="label-text-alt">Bottom Right label</span>
                    </div> */}
                    </label>

                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Felhasználónév</span>
                            {/* <span className="label-text-alt">Top Right label</span> */}
                        </div>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs"
                            name="username"
                            value={formData.username}
                            onChange={(e) => handleFormChange(e)}
                        />
                        {/* <div className="label">
                        <span className="label-text-alt">Bottom Left label</span>
                        <span className="label-text-alt">Bottom Right label</span>
                    </div> */}
                    </label>

                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">E-mail cím</span>
                            {/* <span className="label-text-alt">Top Right label</span> */}
                        </div>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs"
                            name="email"
                            value={formData.email}
                            onChange={(e) => handleFormChange(e)}
                        />
                        {/* <div className="label">
                        <span className="label-text-alt">Bottom Left label</span>
                        <span className="label-text-alt">Bottom Right label</span>
                    </div> */}
                    </label>

                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Jelszó</span>
                            <span className="label-text-alt">1 A-Z, 1 a-z</span>
                        </div>
                        <input type="password" placeholder="Type here" className="input input-bordered w-full max-w-xs"
                            name="password"
                            value={formData.password}
                            onChange={(e) => handleFormChange(e)}
                        />
                        <div className="label">
                            <span className="label-text-alt">min 8 karakter</span>
                            <span className="label-text-alt">1 0-9, 1 speciális</span>
                        </div>
                    </label>

                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Jelszó újra</span>
                            {/* <span className="label-text-alt">Top Right label</span> */}
                        </div>
                        <input type="password" placeholder="Type here" className="input input-bordered w-full max-w-xs"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={(e) => handleFormChange(e)}
                        />
                        {/* <div className="label"> */}
                        {/* <span className="label-text-alt">min 8 character</span>
                            <span className="label-text-alt">1 A-Z, 1 a-z, 1 0-9, 1 special</span> */}
                        {/* </div> */}
                    </label>

                    <button className="btn btn-primary w-2/3" onClick={submit}>Tovább</button>
                </div>
                {/* </form> */}
            </div>
        </div >
    );
}