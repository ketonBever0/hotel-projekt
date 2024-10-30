import pool from "@api/db";
import { RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM users;");
		console.log(rows)
		return NextResponse.json(rows);
	} catch (error) {
		return NextResponse.json(
			{ message: "Error fetching users!", error: error },
			{ status: 500 }
		);
	}
}
