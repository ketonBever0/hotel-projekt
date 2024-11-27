import pool from "@/app/api/db";
import { RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const [data] = await pool.query<RowDataPacket[]>(
		`
            SELECT t.name, COUNT(r.id) AS quantity, MAX(f.price) AS maxPrice, ROUND(AVG(f.price)) AS averagePrice FROM reservations f
            JOIN rooms r ON f.room_id = r.id
            RIGHT JOIN room_types t ON r.room_type_id = t.id
            GROUP BY t.name
            ORDER BY 2 DESC;
        `,
		[]
	);

	return NextResponse.json(data);
}
