"use client"

import axios, { AxiosResponse } from "axios";
import { redirect } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {

    const [roomType, setRoomType] = useState({});

    const { id } = React.use(params);
    const getRoomTypeInfo = async () => {
        await axios.get(`${process.env.appHost}/api/roomtype/${id}`)
            .then((res: AxiosResponse) => {
                if (res.status == 200) setRoomType(res.data);
            })
    }

    useEffect(() => {
        getRoomTypeInfo();
    }, []);

    const now = new Date();
    // console.log(now);
    const [formData, setFormData] = useState({
        roomTypeId: id,
        startDate: "",
        endDate: "",
        email: "",
        fullname: "",
        mobile: ""
    });

    const handleFormChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const [errorText, setErrorText] = useState<string | null>(null);


    const getAvability = async () => {
        await axios.get(`${process.env.appHost}/api/roomtype/isavailable/${id}?startDate=${formData.startDate}&endDate=${formData.endDate}`)
            .then((res: AxiosResponse) => {
                if (res.data.available == 0) setErrorText("A megadott idősávban nincs elérhető szoba a kívánt szobatípusból.\n Kérlek válassz másik idősávot.")
            });
    }

    useEffect(() => {
        if (formData.startDate != "" && formData.endDate != "") getAvability();
    }, [formData.startDate, formData.endDate])



    const startMinDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate() + 4}`;
    const endMinDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate() + 5}`;


    return (
        <div>
            <div className="min-w-60 p-8 bg-primary rounded-md space-y-4 flex flex-col justify-center">
                <div className="flex flex-wrap justify-center space-x-6 stace-y-6">

                    <div className="flex flex-col">
                        <label htmlFor="startDate">Mikortól?</label>
                        <input type="date"
                            id="startDate"
                            name="startDate"
                            min={startMinDate}
                            onChange={handleFormChange}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="startDate">Meddig?</label>
                        <input type="date"
                            id="endDate"
                            name="endDate"
                            min={endMinDate}
                            onChange={handleFormChange}
                        />
                    </div>


                </div>

                <p className="text-center">{errorText && errorText}</p>

                <div className="space-y-4">
                    <label className="input input-bordered flex items-center gap-2">
                        <b className="">E-mail cím:</b>
                        <input type="text" className="grow"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <b>Teljes név:</b>
                        <input type="text" className="grow"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleFormChange}
                        />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <b>Telefonszám:</b>
                        <input type="text" className="grow"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleFormChange}
                        />
                    </label>
                </div>

                <div className="flex justify-center">
                <button className="btn btn-base-200 w-20"
                    disabled={errorText != null}
                    onClick={async () => {
                        await axios.post(`${process.env.appHost}/api/reservation`, formData)
                            .then((res: AxiosResponse) => {
                                if (res.status == 201) {
                                    console.log("Szoba lefoglalva!")
                                    console.log(res.data);
                                    redirect(`/booking/data/${res.data.id}`);
                                }
                            })
                    }}
                >Foglalás</button>
                </div>

            </div>
        </div>
    );
}