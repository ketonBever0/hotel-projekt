import pool from "@api/db";
import { NextResponse } from "next/server";

export default async function GET() {
	const [data] = await pool.query(
		`
            SELECT r.id, r.room_number AS roomNumber, r.description, IFNULL(r.custom_price, t.daily_price) AS price, t.name AS roomType
            FROM rooms AS r LEFT JOIN room_types AS t ON r.room_type_id = t.id;
        `,
		[]
	);

    return NextResponse.json(data);
}
