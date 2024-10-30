import { NextResponse } from "next/server";
import pool from "../../db";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const user = pool.query("SELECT * FROM users WHERE id = ?;", [params.id]);

		return NextResponse.json(user);
	} catch (error) {
		return NextResponse.json(
			{ message: "Error fetching user!", error: error },
			{ status: 500 }
		);
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const body = await req.json();
	try {
		const update = await (
			await pool
		).query(
			"UPDATE users WHERE id = ? SET name='?', email='?', username='?;",
			[params.id, body.name, body.email, body.username]
		);
		return update;
	} catch (error) {
		return NextResponse.json(
			{ message: "Error!", error: error },
			{ status: 400 }
		);
	}
}
