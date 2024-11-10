import { NextResponse } from "next/server";
import pool from "../db";
import { RowDataPacket } from "mysql2";

export default async function GET() {
	const [data] = await pool.query<RowDataPacket[]>(
		`
            SELECT f.id, f.start_date AS startDate, f.end_date AS endDate, f.room_id AS roomId, r.room_number AS roomNumber
            FROM reservations AS f
            JOIN rooms AS r ON f.room_id = r.id;
        `,
		[]
	);
	return NextResponse.json(data[0]);
}
