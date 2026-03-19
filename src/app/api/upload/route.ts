import { NextResponse } from "next/server"
import fs from "node:fs"
import path from "node:path"

export async function POST(request: Request) {
	const formData = await request.formData()
	const file = formData.get("file") as File | null

	if (!file) {
		return NextResponse.json({ error: "No file" }, { status: 400 })
	}

	const bytes = await file.arrayBuffer()
	const buffer = Buffer.from(bytes)

	const ext = file.name.split(".").pop() || "jpg"
	const filename = `product-${Date.now()}.${ext}`
	const filepath = path.join(process.cwd(), "public", filename)

	fs.writeFileSync(filepath, buffer)

	return NextResponse.json({ url: `/${filename}` })
}
