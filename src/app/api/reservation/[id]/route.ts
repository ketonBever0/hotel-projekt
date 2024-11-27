import { NextRequest, NextResponse } from "next/server";
import pool from "../../db";
import { RowDataPacket } from "mysql2";

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const [data] = await pool.query<RowDataPacket[]>(
		`
            SELECT f.id, r.room_number AS roomNumber, f.start_date AS startDate, f.end_date AS endDate, f.price
            FROM reservations AS f JOIN rooms AS r ON f.room_id = r.id
            WHERE f.id = ?;
        `,
		[(await params).id]
	);

	return NextResponse.json(data[0]);
}
