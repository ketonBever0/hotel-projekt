import { NextRequest } from "next/server";
import pool from "../../db";
import { RowDataPacket } from "mysql2";

export async function getUser(req: NextRequest) {
	const access: {
		id: number;
		email: string;
		username: string;
		iat: number;
		exp: number;
	} = JSON.parse(req.headers.get("x-user")!).payload;

	const [rows] = await pool.query<RowDataPacket[]>(
		`
            SELECT u.id, u.username, u.email, u.fullname, u.role, e.username AS enrolledBy
            FROM users AS u LEFT JOIN users AS e ON u.enrolled_by = e.id
            WHERE u.id = ?;`,
		[access.id]
	);
	// delete rows[0].password;
	return rows[0];
}
