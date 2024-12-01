import pool from "@/app/api/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const body = await req.json();

	await pool.query(
		`
			UPDATE reservations
			SET price = ?
			WHERE id = ?;
		`,
		[body.price, (await params).id]
	);

	return NextResponse.json({ message: "Ár frissítve." });
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	await pool.query(
		`
			DELETE FROM reservations
			WHERE id = ?
		`,
		[(await params).id]
	);

	return NextResponse.json({ message: "Foglalás törölve!" });
}
