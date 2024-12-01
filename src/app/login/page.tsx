"use client"
import { tError, tSuccess } from "@/components/ui/Toasts";
import { UserContext } from "@/providers/UserContext";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";


export default function Login() {

    const router = useRouter();

    const { updateToken } = useContext(UserContext);

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const submit = async () => {
        await axios.post(`${process.env.appHost}/api/user/login`, formData)
            .then((res: AxiosResponse) => {
                if (res.status == 200) {
                    // console.log("Belépve");
                    sessionStorage.setItem("access", res.data.token)
                    updateToken();
                    router.push("/");
                    tSuccess("Sikeres bejelentkezés!");
                }
            })
            .catch(((e: AxiosError) => {
                if (e.response?.status == 403) {
                    tError("Hibás felhasználónév vagy jelszó!");
                } else console.log(e);
            }));
    }


    return (
        <div>

            <div className="w-full max-w-md p-8 rounded-lg shadow-md bg-base-100">

                <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>

                {/* <form> */}

                <div className="flex-col align-center space-y-6 px-4 text-center">


                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Username</span>
                            {/* <span className="label-text-alt">Top Right label</span> */}
                        </div>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs"
                            name="username"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                        />
                    </label>

                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Password</span>
                        </div>
                        <input type="password" placeholder="Type here" className="input input-bordered w-full max-w-xs"
                            name="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </label>


                    <button className="btn btn-primary w-2/3" onClick={() => submit()}>Login</button>
                </div>
                {/* </form> */}
            </div>

        </div>
    )

}