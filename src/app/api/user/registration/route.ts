import * as argon from "argon2";
import pool from "../../db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const body = await req.json();
	const hash = await argon.hash(body.password);
	try {
		const user = await pool.query(
			`
            INSERT INTO users (fullname, username, email, password)
            VALUES (?, ?, ?, ?)
            `,
			[body.fullname, body.username, body.email, hash]
		);

		return NextResponse.json(
			{
				user,
				message: "User created!",
			},
			{ status: 201 }
		);
	} catch (e: any) {
		if (e.message.includes("email")) {
			return NextResponse.json(
				{ message: "E-mail address already exists!" },
				{ status: 400 }
			);
		} else if (e.message.includes("username")) {
			return NextResponse.json(
				{ message: "Username already exists!" },
				{ status: 400 }
			);
		}

		return NextResponse.json(
			{ message: "Server error!", error: e },
			{ status: 500 }
		);
	}
}
