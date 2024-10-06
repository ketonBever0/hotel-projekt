import pool from "@api/db";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const [users] = await (await pool).query("SELECT * FROM users");
		return NextResponse.json(users);
	} catch (error) {
		return NextResponse.json(
			{ message: "Error fetching users!", error: error },
			{ status: 500 }
		);
	}
}
