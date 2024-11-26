"use client"

import axios, { AxiosResponse } from "axios";
import singleBedImg from "@assets/icons/roomtype/single_bed.png";
import doubleBedImg from "@assets/icons/roomtype/double_bed.png";
import babyBedImg from "@assets/icons/roomtype/baby_bed.png";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {

    const [roomTypes, setRoomTypes] = useState<Array<any>>([]);

    const getRoomTypes = async () => {
        await axios.get(`${process.env.appHost}/api/roomtype`)
            .then((res: AxiosResponse) => {
                if (res.status == 200) setRoomTypes(res.data);
            })
    }

    useEffect(() => {
        getRoomTypes();
    }, []);


    const [filter, setFilter] = useState({
        singleBeds: 0,
        doubleBeds: 0,
        babyBeds: 0
    });

    const handleFilterChange = (e: any) => {
        setFilter({
            ...filter,
            [e.target.name]: e.target.value
        });
    }


    return (
        <div className="space-y-5">
            <h2 className="text-2xl text-center">Milyen szobát foglalnál?</h2>

            <div className="flex flex-wrap justify-center gap-10">

                <div className="flex flex-col">
                    <label htmlFor="singleBeds">Egyszemélyes ágyak minimum</label>
                    <input type="number"
                        className="input input-bordered"
                        id="singleBeds"
                        name="singleBeds"
                        value={filter.singleBeds}
                        onChange={handleFilterChange}
                        min={0} />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="doubleBeds">Kétszemélyes ágyak minimum</label>
                    <input type="number"
                        className="input input-bordered"
                        id="doubleBeds"
                        name="doubleBeds"
                        value={filter.doubleBeds}
                        onChange={handleFilterChange}
                        min={0} />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="babyBeds">Babaágyak minimum</label>
                    <input type="number"
                        className="input input-bordered"
                        id="babyBeds"
                        name="babyBeds"
                        value={filter.babyBeds}
                        onChange={handleFilterChange}
                        min={0}
                    />
                </div>

            </div>

            <div className="flex flex-wrap justify-center gap-8">
                {
                    roomTypes.length > 0 && roomTypes
                        .filter((t) => t.singleBeds >= filter.singleBeds)
                        .filter((t) => t.doubleBeds >= filter.doubleBeds)
                        .filter((t) => t.babyBeds >= filter.babyBeds)
                        .map((roomType: any, id: React.Key) => (
                            <div className="card bg-base-100 w-80 shadow-xl" key={id}>
                                <figure>
                                    <img
                                        src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                                        alt={roomType.name} />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">{roomType.name}</h2>
                                    <p>{roomType.description}</p>
                                    <div className="flex flex-wrap gap-4">
                                        {roomType.singleBeds > 0 &&
                                            <div><img src={singleBedImg.src} className="w-8" title="Egyszemélyes ágyak száma" alt="Egyszemélyes ágyak száma:" />
                                                {roomType.singleBeds} db</div>}
                                        {roomType.doubleBeds > 0 &&
                                            <div><img src={doubleBedImg.src} className="w-8" title="Kétszemélyes ágyak száma" alt="Kétszemélyes ágyak száma" />
                                                {roomType.doubleBeds} db</div>}
                                        {roomType.babyBeds > 0 &&
                                            <div><img src={babyBedImg.src} className="w-8" title="Babaágyak száma" alt="Babaágyak száma" />
                                                {roomType.babyBeds} db</div>}
                                    </div>
                                    <div className="card-actions justify-end">
                                        <Link href={`/booking/${roomType.id}`} className="btn btn-primary">{roomType.dailyPrice} HUF</Link>
                                    </div>
                                </div>
                            </div>
                        ))
                }
                {/* <div className="card bg-base-100 w-96 shadow-xl">
                    <figure>
                        <img
                            src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                            alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div> */}
            </div>


        </div>
    );
}