import { NextRequest, NextResponse } from "next/server";
import { getUser } from "../../user/auth";
import pool from "@/app/api/db";
import { ResultSetHeader } from "mysql2";

export async function PUT(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const user = await getUser(req);

	await pool.query<ResultSetHeader>(
		`
            UPDATE customers
            SET user_id = ?
            WHERE id = ?;
        `,
		[user.id, (await params).id]
	);

	return NextResponse.json({ message: "Vendég elfogadva." });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	await pool.query(
		`
            DELETE FROM customers
            WHERE id = ?
        `,
		[(await params).id]
	);

	return NextResponse.json({ message: "Vendég törölve." });
}
