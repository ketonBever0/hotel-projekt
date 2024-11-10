import pool from "@api/db";
import { RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "../auth";

export async function GET(req: NextRequest) {
	try {
		const user = await getUser(req);
		if (user.role == "NORMAL") {
			return NextResponse.json(
				{ message: "Unallowed!" },
				{ status: 403 }
			);
		}
		const [rows] = await pool.query<RowDataPacket[]>(`
				SELECT u.id, u.username, u.email, u.fullname, u.role, e.username AS enrolledBy
				FROM users AS u LEFT JOIN users AS e ON e.id = u.enrolled_by;
			`);
		// console.log(rows);
		return NextResponse.json(rows);
	} catch (error) {
		return NextResponse.json(
			{ message: "Error fetching users!", error: error },
			{ status: 500 }
		);
	}
}
