import type { Metadata, Viewport } from "next"
import "./globals.css"
import { FullscreenProvider } from "./fullscreen-provider"

export const metadata: Metadata = {
	title: "AliExpress - Orders",
	description: "Order tracking",
	manifest: "/manifest.json",
	icons: {
		icon: "/favicon.webp",
		apple: "/favicon.webp",
	},
	appleWebApp: {
		capable: true,
		statusBarStyle: "default",
		title: "AliExpress",
	},
}

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt">
			<body className="bg-white w-full overflow-hidden" style={{ height: "100dvh" }}>
				<FullscreenProvider />
				{children}
			</body>
		</html>
	)
}
