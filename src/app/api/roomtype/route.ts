import { NextRequest, NextResponse } from "next/server";
import pool from "../db";

export async function GET() {
	try {
		const [roomTypes] = await (
			await pool
		).query("SELECT * FROM room_types;");
		return NextResponse.json({ roomTypes });
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
			singleBeds,
			doubleBeds,
			babyBeds,
			description,
			dailyPrice,
		} = body;
		const query = await (await pool).query(`
            INSERT INTO room_types (name, single_beds, double_beds, baby_beds, description, daily_price)
            VALUES ('${name}', ${singleBeds}, ${doubleBeds}, ${babyBeds}, '${description}', ${dailyPrice})
            `);
            return NextResponse.json({message: "Query successful!", data: query}, {status: 201});
	} catch (error) {
		return NextResponse.json(
			{ message: "Query failed!", error: error },
			{ status: 500 }
		);
	}
}
