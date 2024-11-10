import pool from "@/app/api/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const body = await req.json();
	try {
		await pool.query(
			`
                UPDATE rooms
                SET room_number = ?, description = ?, custom_price = ?, room_type_id = ?
                WHERE id = ?
            `,
			[
				body.roomNumber,
				body.description,
				body.customPrice,
				body.roomTypeId,
				(await params).id,
			]
		);
		return NextResponse.json({ message: "Room updated." });
	} catch (error) {
		return NextResponse.json({ message: "Error occoured!", error });
	}
}

export async function DELETE({ params }: { params: Promise<{ id: string }> }) {
	try {
		await pool.query(
			`
                DELETE FROM rooms
                WHERE id = ?
            `,
			[(await params).id]
		);
		return NextResponse.json({ message: "Room updated." });
	} catch (error) {
		return NextResponse.json({ message: "Error occoured!", error });
	}
}
