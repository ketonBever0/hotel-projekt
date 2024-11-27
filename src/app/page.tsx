"use client"

import Link from "next/link";

// import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-primary">
      <div className="text-accent">
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Üdvözöljük a hotelünkben!</h1>
              <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                quasi. In deleniti eaque aut repudiandae et a id nisi.
              </p>
              <Link href={"/booking"} className="btn btn-primary">Foglaljon szobát</Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
