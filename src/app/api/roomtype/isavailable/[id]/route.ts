import pool from "@/app/api/db";
import { RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const queryId = parseInt((await params).id);
	const { searchParams } = new URL(req.url);

	const startDate: string = searchParams.get("startDate")!;
	const endDate: string = searchParams.get("endDate")!;

	const [data] = await pool.query<RowDataPacket[]>(
		`
            SELECT IF(
                (SELECT COUNT(*)
                FROM (
                    SELECT r.id, r.room_number, f.start_date, f.end_date
                    FROM rooms AS r
                    LEFT JOIN reservations AS F ON f.room_id = r.id
                    JOIN room_types AS t ON r.room_type_id = t.id
                    WHERE t.id = ? AND r.is_in_order = TRUE
                    AND ? NOT BETWEEN f.start_date AND f.end_date
                    AND f.start_date NOT BETWEEN ? AND ?
                    AND ? NOT BETWEEN f.start_date AND f.end_date
                    AND f.end_date NOT BETWEEN ? AND ?
                    OR ISNULL(f.start_date) AND ISNULL(f.end_date)
                    ) AS sub
                ) > 0,
                TRUE,
                FALSE
            ) AS available;
        `,
		[queryId, startDate, startDate, endDate, endDate, startDate, endDate]
	);

	return NextResponse.json(data[0]);
}
