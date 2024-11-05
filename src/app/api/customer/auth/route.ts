import { NextRequest } from "next/server";
import { getUser } from "../../user/auth/auth";
import pool from "../../db";


export async function PUT(req: NextRequest) {

    const user = await getUser(req);

    const body = await req.json();

    const customer = await pool.query(`
            UPDATE customers
            SET user_id = ?
            WHERE id = ?;
        `, [user.id, body.id]);


}