import { NextRequest, NextResponse } from "next/server";
import pool from "@api/db";
import { RowDataPacket } from "mysql2";

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const [user] = await pool.query<RowDataPacket[]>(
			`
				SELECT u.id, u.username, u.email, u.fullname, u.role, e.username AS enrolledBy
				FROM users AS u LEFT JOIN users AS e ON e.id = u.enrolled_by
				WHERE u.id = ?;
			`,
			[(await params).id]
		);

		return NextResponse.json(user[0]);
	} catch (error) {
		return NextResponse.json(
			{ message: "Error fetching user!", error: error },
			{ status: 500 }
		);
	}
}

export async function PATCH(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const body = await req.json();
	try {
		const update = await pool.query(
			"UPDATE users WHERE id = ? SET name = '?', email = '?', username = '?;",
			[(await params).id, body.name, body.email, body.username]
		);
		return NextResponse.json({ message: "Adatok frissültek!" });
	} catch (error) {
		return NextResponse.json(
			{ message: "Error!", error: error },
			{ status: 400 }
		);
	}
}
