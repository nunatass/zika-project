import { NextResponse } from "next/server"
import fs from "node:fs"
import path from "node:path"

const DATA_PATH = path.join(process.cwd(), "public", "data.json")

export async function GET() {
	const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"))
	return NextResponse.json(data)
}

export async function POST(request: Request) {
	const body = await request.json()
	fs.writeFileSync(DATA_PATH, JSON.stringify(body, null, "\t"))
	return NextResponse.json({ success: true })
}
