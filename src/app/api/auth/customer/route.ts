import { NextRequest, NextResponse } from "next/server";
import pool from "../../db";
import { RowDataPacket } from "mysql2";


export async function GET(req: NextRequest) {

    const [data] = await pool.query<RowDataPacket[]>(
        `
            SELECT c.id, c.fullname, c.email, c.mobile_number AS mobile, c.is_banned AS isBanned, u.username AS acceptedBy
            FROM customers AS c LEFT JOIN users AS u ON c.user_id = u.id;
        `,
        []
    );

    return NextResponse.json(data);
}
