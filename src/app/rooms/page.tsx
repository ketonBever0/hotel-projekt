import axios from "axios";
import singleBedImg from "@assets/icons/roomtype/single_bed.png";
import doubleBedImg from "@assets/icons/roomtype/double_bed.png";
import babyBedImg from "@assets/icons/roomtype/baby_bed.png";
import Link from "next/link";

export default async function Page() {

    const roomTypes: Array<any> = (await axios.get(`${process.env.appHost}/api/roomtype`)).data;
    // console.log(roomTypes);
    return (
        <div className="space-y-5">
            <h2 className="text-2xl text-center">Milyen szobát foglalnál?</h2>

            <div className="flex flex-wrap justify-center gap-8">
                {
                    roomTypes.length > 0 && roomTypes.map((roomType, id) => (
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
                                    <div><img src={singleBedImg.src} className="w-8" title="Egyszemélyes ágyak száma" alt="Egyszemélyes ágyak száma:" />
                                        {roomType.singleBeds} db</div>
                                    {roomType.doubleBeds > 0 &&
                                        <div><img src={doubleBedImg.src} className="w-8" title="Kétszemélyes ágyak száma" alt="Kétszemélyes ágyak száma" />
                                            {roomType.doubleBeds} db</div>}
                                    {roomType.babyBeds > 0 &&
                                        <div><img src={babyBedImg.src} className="w-8" title="Babaágyak száma" alt="Babaágyak száma" />
                                            {roomType.babyBeds} db</div>}
                                </div>
                                <div className="card-actions justify-end">
                                    <Link href={`/rooms/${roomType.id}`} className="btn btn-primary">{roomType.dailyPrice} HUF</Link>
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