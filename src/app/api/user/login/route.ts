import * as argon from "argon2";
import pool from "@api/db";
import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
	const body = await req.json();
	try {
		const [rows] = await pool.query<RowDataPacket[]>(
			`
            SELECT * FROM users
            WHERE email = ?;
            `,
			[body.email]
		);

		if (rows.length === 0)
			return NextResponse.json(
				{ message: "User not found!" },
				{ status: 404 }
			);
		const user = rows[0];
		if (await argon.verify(rows[0].password, body.password)) {
			const token = jwt.sign(
				{ id: user.id, email: user.email, username: user.username },
				process.env.JWT_SECRET!,
				{ expiresIn: "1h" }
			);
			delete user.password;
			return NextResponse.json({ token });
		} else
			return NextResponse.json(
				{ message: "Invalid password!" },
				{ status: 403 }
			);
	} catch (error) {
		return NextResponse.json({ message: "Error!", error }, { status: 500 });
	}
}
