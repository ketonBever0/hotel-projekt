import { RowDataPacket } from "mysql2";
import pool from "../../db";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: Promise<{ id: string }> }) {
	const [data] = await pool.query<RowDataPacket[]>(
		`
            SELECT r.id, r.room_number AS roomNumber, IFNULL(r.description, t.description) AS description, IFNULL(r.custom_price, t.daily_price) AS price, t.single_beds, t.double_beds, t.baby_beds
            FROM rooms AS r
            JOIN room_types AS t ON r.room_type_id = t.id
            WHERE r.id = ?;
        `,
		[(await params).id]
	);

	if (data.length > 0) return NextResponse.json(data[0]);
	else
		return NextResponse.json(
			{ message: "Room not found!" },
			{ status: 404 }
		);
}