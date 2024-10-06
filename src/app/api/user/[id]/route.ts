import { NextResponse } from "next/server";
import pool from "../../db";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const [user] = await (
			await pool
		).query(`SELECT * FROM users WHERE id = ${params.id}`);

		return NextResponse.json(user);
	} catch (error) {
		return NextResponse.json(
			{ message: "Error fetching user!", error: error },
			{ status: 500 }
		);
	}
}
