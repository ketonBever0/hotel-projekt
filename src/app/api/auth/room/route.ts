import { NextRequest, NextResponse } from "next/server";
import pool from "../../db";


export async function POST(req: NextRequest) {
	const body = await req.json();
	try {
		const [data] = await pool.query(
			`
                INSERT INTO rooms(room_number, description, custom_price, room_type_id)
                VALUES (?, ?, ?, ?)
            `,
			[
				body.roomNumber,
				body.description,
				body.customPrice,
				body.roomTypeId,
			]
		);
		if (data) {
			return NextResponse.json(
				{ message: "Room added!" },
				{ status: 201 }
			);
		}
	} catch (error) {
		NextResponse.json({ error: error }, { status: 500 });
	}
}