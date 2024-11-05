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

export async function PATCH(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const body = await req.json();
		const {
			name,
			bedrooms,
			singleBeds,
			doubleBeds,
			babyBeds,
			description,
			dailyPrice,
		} = body;
		const query = await pool.query(
			`
				UPDATE room_types
				SET name = ?, bedrooms = ?, single_beds = ?, double_beds = ?, baby_beds = ?, description = ?, daily_price = ?
				WHERE id = ?;
            `,
			[
				name,
				bedrooms,
				singleBeds,
				doubleBeds,
				babyBeds,
				description,
				dailyPrice,
				(await params).id,
			]
		);
		return NextResponse.json(
			{ message: "Query successful!", data: query },
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "Query failed!", error: error },
			{ status: 500 }
		);
	}
}
