import { RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";
import pool from "../../db";

export async function GET() {
	const [data] = await pool.query<RowDataPacket[]>(
		`
            SELECT f.id, f.requested_at AS requestedAt, f.start_date AS startDate, f.end_date AS endDate, f.room_id AS roomId, r.room_number AS roomNumber,
				c.id AS customerId, c.email AS email, c.fullname AS fullname, c.mobile_number AS mobile, c.is_banned AS isBanned, u.username AS acceptedBy
            FROM reservations AS f
            JOIN rooms AS r ON f.room_id = r.id
			JOIN customers AS c ON f.customer_id = c.id
			LEFT JOIN users AS u ON c.user_id = u.id;
        `,
		[]
	);
	return NextResponse.json(data);
}
