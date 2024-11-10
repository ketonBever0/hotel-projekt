import * as argon from "argon2";
import pool from "../../../db";
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "../auth";

export async function POST(req: NextRequest) {
	const enroller = await getUser(req);
	if (enroller.role == "NORMAL") {
		return NextResponse.json({ message: "Unallowed!" }, { status: 403 });
	}

	const body = await req.json();
	const hash = await argon.hash(body.password);
	try {
		const user = await pool.query(
			`
				INSERT INTO users (fullname, username, email, password, enrolled_by)
				VALUES (?, ?, ?, ?, ?);
            `,
			[
				body.fullname,
				body.username.strip(),
				body.email.strip(),
				hash,
				enroller.id,
			]
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
