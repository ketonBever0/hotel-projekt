"use client"

import { useState } from "react"
import axios from "axios";

export default function Registration() {

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
        await axios.post("http://localhost:3000/api/user/registration", formData).then((res) => console.log(res)).catch((e) => console.log(e));
    }

    return (
        <div className="flex flex-row justify-center">

            <h1 className="text-3xl text-center">Registration</h1>

            {/* <form className="flex flex-col align-center"> */}

            <div className="flex-col align-center">
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Full Name</span>
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
                        <span className="label-text">Username</span>
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
                        <span className="label-text">E-mail address</span>
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
                        <span className="label-text">Password</span>
                        {/* <span className="label-text-alt">Top Right label</span> */}
                    </div>
                    <input type="password" placeholder="Type here" className="input input-bordered w-full max-w-xs"
                        name="password"
                        value={formData.password}
                        onChange={(e) => handleFormChange(e)}
                    />
                    <div className="label">
                        <span className="label-text-alt">min 8 character</span>
                        <span className="label-text-alt">1 A-Z, 1 a-z, 1 0-9, 1 special</span>
                    </div>
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Password Again</span>
                        {/* <span className="label-text-alt">Top Right label</span> */}
                    </div>
                    <input type="password" placeholder="Type here" className="input input-bordered w-full max-w-xs"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={(e) => handleFormChange(e)}
                    />
                    <div className="label">
                        <span className="label-text-alt">min 8 character</span>
                        <span className="label-text-alt">1 A-Z, 1 a-z, 1 0-9, 1 special</span>
                    </div>
                </label>

                <button className="btn btn-primary" onClick={submit}>Submit</button>
            </div>
            {/* </form> */}

        </div>
    );
}