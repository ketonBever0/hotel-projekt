import { NextRequest, NextResponse } from "next/server";
import pool from "../db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export async function POST(req: NextRequest) {
	const body = await req.json();

	const [availableRooms] = await pool.query<RowDataPacket[]>(
		`
			SELECT r.id, r.room_number, f.start_date, f.end_date, t.daily_price AS dailyPrice
			FROM rooms AS r
			LEFT JOIN reservations AS F ON f.room_id = r.id
			JOIN room_types AS t ON r.room_type_id = t.id
			WHERE t.id = ? AND r.is_in_order = TRUE
			AND ? NOT BETWEEN f.start_date AND f.end_date
			AND f.start_date NOT BETWEEN ? AND ?
			AND ? NOT BETWEEN f.start_date AND f.end_date
			AND f.end_date NOT BETWEEN ? AND ?
			OR ISNULL(f.start_date) AND ISNULL(f.end_date);
		`,
		[
			body.roomTypeId,
			body.startDate,
			body.startDate,
			body.endDate,
			body.endDate,
			body.startDate,
			body.endDate,
		]
	);
	// console.log(availableRooms);
	if (availableRooms.length == 0)
		return NextResponse.json(
			{ message: "Nincs elérhető szoba!" },
			{ status: 404 }
		);

	// const user = await getUser(req);

	let customerId;

	const [customerQuery] = await pool.query<RowDataPacket[]>(
		`
				SELECT id
				FROM customers
				WHERE email = ?;
			`,
		[body.email]
	);

	if (customerQuery.length == 0) {
		const query = await pool.query<ResultSetHeader>(
			`
					INSERT INTO customers (email, fullname, mobile_number)
					VALUES (?, ?, ?)
				`,
			[body.email, body.fullname, body.mobile]
		);
		console.log(query);
		customerId = query[0].insertId;
		// console.log(customerId);
	} else {
		customerId = customerQuery[0].id;
		await pool.query(
			`
				UPDATE customers
				SET fullname = ?, mobile_number = ?
				WHERE id = ?
			`,
			[body.fullname, body.mobile, customerId]
		);
	}

	// const [customer] = await pool.query<RowDataPacket[]>(
	// 	`
	// 		SELECT id, fullname, email, mobile_number AS mobileNumber, is_banned AS isBanned
	// 		FROM customers
	// 		WHERE id = ?;
	// 	`,
	// 	[customerId]
	// );
	// console.log(customer[0]);

	// return NextResponse.json({});
	const randomRoomIndex = Math.floor(Math.random() * availableRooms.length);

	const [data] = await pool.query<ResultSetHeader>(
		`
			INSERT INTO reservations (start_date, end_date, customer_id, room_id, price)
			VALUES (?, ?, ?, ?, DATEDIFF(?, ?) * ?);
		`,
		[
			body.startDate,
			body.endDate,
			customerId,
			parseInt(availableRooms[randomRoomIndex].id),
			body.endDate,
			body.startDate,
			availableRooms[randomRoomIndex].dailyPrice
		]
	);
	console.log(data);
	const [reservation] = await pool.query<RowDataPacket[]>(
		`
			SELECT f.id AS id, f.start_date AS startDate, f.end_date AS endDate,
				r.room_number AS roomNumber, t.name AS roomType, f.price AS price,
				t.single_beds AS singleBeds, t.double_beds AS doubleBeds, t.baby_beds AS babyBeds
			FROM reservations AS f
			JOIN rooms as r ON f.room_id = r.id
			JOIN room_types AS t ON r.room_type_id = t.id
			WHERE f.id = ?
		`,
		[data.insertId]
	);

	return NextResponse.json(reservation[0], { status: 201 });
}

