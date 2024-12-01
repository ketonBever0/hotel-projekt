import * as argon from "argon2";
import pool from "../../../db";
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "../auth";

export async function POST(req: NextRequest) {
	const enroller = await getUser(req);
	if (enroller.role == "NORMAL") {
		return NextResponse.json(
			{ message: "Nincs jogosultságod!" },
			{ status: 403 }
		);
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
				body.username.trim(),
				body.email.trim(),
				hash,
				enroller.id,
			]
		);

		return NextResponse.json(
			{
				user,
				message: "Felhasználó regisztrálva!",
			},
			{ status: 201 }
		);
	} catch (e: any) {
		// console.log(e.message);
		if (e.message.includes("email")) {
			return NextResponse.json(
				{ message: "E-mail cím már létezik!" },
				{ status: 400 }
			);
		} else if (e.message.includes("username")) {
			return NextResponse.json(
				{ message: "Felhasználónév foglalt!" },
				{ status: 400 }
			);
		}

		return NextResponse.json(
			{ message: "Server error!", error: e },
			{ status: 500 }
		);
	}
}
