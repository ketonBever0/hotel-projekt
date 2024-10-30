import { NextRequest } from "next/server";
import pool from "../../db";
import { RowDataPacket } from "mysql2";


export async function getUser(req: NextRequest) {
    const access: {id: number, email: string, username: string, iat: number, exp: number} = JSON.parse(req.headers.get("x-user")!).payload;

    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM users WHERE id = ?;", [access.id]);
    delete rows[0].password;
    return rows[0];

}