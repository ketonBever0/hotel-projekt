import { NextRequest, NextResponse } from "next/server";
import pool from "../db";

export async function GET() {
	try {
		const [roomTypes] = await pool.query(`
				SELECT t.id, t.name, t.bedrooms, t.single_beds AS singleBeds, t.double_beds AS doubleBeds, t.baby_beds AS babyBeds, t.description, t.daily_price AS dailyPrice, COUNT(r.id) roomCount
				FROM room_types AS t JOIN rooms AS r ON t.id = r.room_type_id
				WHERE r.is_in_order = 1
				GROUP BY t.id;
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
