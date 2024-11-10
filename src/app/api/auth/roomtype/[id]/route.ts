import pool from "@/app/api/db";
import { NextRequest, NextResponse } from "next/server";

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
