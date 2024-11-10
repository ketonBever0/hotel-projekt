import pool from "@api/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
	const [data] = await pool.query(
		`
            SELECT r.id, r.room_number AS roomNumber, r.is_in_order as isInOrder, t.daily_price AS price, t.name AS roomType
            FROM rooms AS r LEFT JOIN room_types AS t ON r.room_type_id = t.id;
        `,
		[]
	);

	return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
	const body = await req.json();

	const [data] = await pool.query(
		`
			INSERT INTO rooms (room_number, room_type_id)
			VALUES (?, ?)
		`,
		[body.roomNumber, body.roomTypeId]
	);

	return NextResponse.json({message: "Room created!"}, { status: 201 });
}
