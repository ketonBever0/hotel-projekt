import { NextRequest, NextResponse } from "next/server";
import pool from "../db";

export async function GET() {
	try {
		const [roomTypes] = await pool.query(`
				SELECT id, name, bedrooms, single_beds AS singleBeds, double_beds AS doubleBeds, baby_beds AS babyBeds, description
				FROM room_types;
			`);
		return NextResponse.json(roomTypes);
	} catch (error) {
		return NextResponse.json(
			{ message: "Query failed!", error: error },
			{ status: 500 }
		);
	}
}

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const {
			name,
			bedrooms,
			singleBeds,
			doubleBeds,
			babyBeds,
			description,
			dailyPrice,
		} = body;
		const query = await pool.query(
			`
				INSERT INTO room_types (name, bedrooms, single_beds, double_beds, baby_beds, description, daily_price)
				VALUES (?, ?, ?, ?, ?, ?, ?);
            `,
			[
				name,
				bedrooms,
				singleBeds,
				doubleBeds,
				babyBeds,
				description,
				dailyPrice,
			]
		);
		return NextResponse.json(
			{ message: "Query successful!", data: query },
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "Query failed!", error: error },
			{ status: 500 }
		);
	}
}
