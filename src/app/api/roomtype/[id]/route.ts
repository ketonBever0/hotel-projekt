import pool from "@api/db";
import { RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const [data] = await pool.query<RowDataPacket[]>(
		`
            SELECT id, name, bedrooms, single_beds AS singleBeds, double_beds AS doubleBeds, baby_beds AS babyBeds, description
            FROM room_types
            WHERE id = ?;
        `,
		[(await params).id]
	);

	return NextResponse.json(
		data.length > 0 ? data[0] : { message: "RoomType not found!" }
	);
}
