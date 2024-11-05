import { NextRequest, NextResponse } from "next/server";
import pool from "../db";

export async function POST(req: NextRequest) {
	const body = await req.json();

	try {
		const request = await pool.query(
			`
                INSERT INTO customers (fullname, email, mobile_number)
                VALUES (?, ?, ?);
        `,
			[body.fullname, body.email.strip(), body.mobileNumber]
		);
	} catch (e: any) {
		if (e.message.includes("email")) {
			return NextResponse.json(
				{
					message:
						"Customer with this e-mail address already exists!",
				},
				{ status: 400 }
			);
		}
	}
}
