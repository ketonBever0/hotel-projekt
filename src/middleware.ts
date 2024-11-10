import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export const config = {
	matcher: ["/api/auth/:path*"],
};

export async function middleware(req: NextRequest) {
	const auth = req.headers.get("Authorization");

	const token = auth?.startsWith("Bearer ") && auth.split(" ")[1];
	if (token) {
		try {
			const decoded = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
			const res = NextResponse.next();
			res.headers.set("x-user", JSON.stringify(decoded));
			return res;
		} catch (e) {
			return NextResponse.json(
				{ message: "Your session has expired." },
				{ status: 403 }
			);
		}
	} else {
		return NextResponse.json(
			{ message: "You need to Log In first!" },
			{ status: 401 }
		);
	}
}
