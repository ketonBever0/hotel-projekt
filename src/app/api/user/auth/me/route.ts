import { NextRequest, NextResponse } from "next/server";
import * as argon from "argon2";
import { getUser } from "../auth";
import pool from "@/app/api/db";
import { RowDataPacket } from "mysql2";

export async function GET(req: NextRequest) {
	return NextResponse.json(await getUser(req));
}

export async function PATCH(req: NextRequest) {
	const user = await getUser(req);

	const [rows] = await pool.query<RowDataPacket[]>(
		"SELECT password FROM users WHERE id = ?;",
		[user.id]
	);
	const body = await req.json();
	if (await argon.verify(rows[0].password, body.password)) {
		if(body.password == body.newPassword) {
			return NextResponse.json(
				{ message: "New password must differ from the old one!" },
				{ status: 404 }
			);
		}
		const hash = await argon.hash(body.newPassword);
		await pool.query("UPDATE users SET password = ?;", [hash]);
		return NextResponse.json({ message: "Password updated." });
	} else {
		return NextResponse.json(
			{ message: "Old password is incorrect!" },
			{ status: 403 }
		);
	}
}
