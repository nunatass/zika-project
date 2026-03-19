"use client"

import { useEffect, useState } from "react"

interface BeforeInstallPromptEvent extends Event {
	prompt(): Promise<void>
	userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function FullscreenProvider() {
	const [showPrompt, setShowPrompt] = useState(false)
	const [isIOS, setIsIOS] = useState(false)
	const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)

	useEffect(() => {
		// Already running as installed PWA — do nothing
		const isStandalone =
			window.matchMedia("(display-mode: standalone)").matches ||
			(navigator as Navigator & { standalone?: boolean }).standalone === true

		if (isStandalone) return

		// Don't show if user dismissed before (respect for 7 days)
		const dismissed = localStorage.getItem("pwa-install-dismissed")
		if (dismissed && Date.now() - Number(dismissed) < 7 * 24 * 60 * 60 * 1000) return

		const ios = /iPad|iPhone|iPod/.test(navigator.userAgent)
		setIsIOS(ios)

		// On Android/Chrome: capture the native install prompt
		const handler = (e: Event) => {
			e.preventDefault()
			setDeferredPrompt(e as BeforeInstallPromptEvent)
			setShowPrompt(true)
		}
		window.addEventListener("beforeinstallprompt", handler)

		// On iOS: show manual instructions after a short delay
		if (ios) {
			const timer = setTimeout(() => setShowPrompt(true), 1500)
			return () => {
				clearTimeout(timer)
				window.removeEventListener("beforeinstallprompt", handler)
			}
		}

		// On Android: if no prompt fires within 3s, show manual instructions
		const fallback = setTimeout(() => {
			if (!deferredPrompt) setShowPrompt(true)
		}, 3000)

		return () => {
			clearTimeout(fallback)
			window.removeEventListener("beforeinstallprompt", handler)
		}
	}, [])

	const handleInstall = async () => {
		if (deferredPrompt) {
			await deferredPrompt.prompt()
			await deferredPrompt.userChoice
			setDeferredPrompt(null)
		}
		setShowPrompt(false)
	}

	const handleDismiss = () => {
		localStorage.setItem("pwa-install-dismissed", String(Date.now()))
		setShowPrompt(false)
	}

	if (!showPrompt) return null

	return (
		<div className="fixed inset-0 z-50 bg-black/60 flex items-end justify-center pb-8 px-4">
			<div className="bg-white rounded-2xl p-5 w-full max-w-sm animate-slide-up">
				<div className="flex items-center gap-3 mb-3">
					<img src="/icon-192.png" alt="AliExpress" className="w-12 h-12 rounded-xl" />
					<div>
						<p className="text-[16px] font-bold text-black">AliExpress</p>
						<p className="text-[12px] text-gray-400">Instalar aplicativo</p>
					</div>
				</div>

				<p className="text-[13px] text-gray-500 mb-4">
					Instale para uma experiência em tela cheia, sem barra do navegador.
				</p>

				{deferredPrompt ? (
					<button
						type="button"
						onClick={handleInstall}
						className="w-full py-3 bg-black text-white text-[15px] font-semibold rounded-full mb-2"
					>
						Instalar agora
					</button>
				) : isIOS ? (
					<div className="text-[13px] text-gray-700 space-y-2.5 mb-4 bg-gray-50 rounded-xl p-4">
						<p className="flex items-center gap-2">
							<span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0">1</span>
							Toque em
							<svg className="w-5 h-5 inline text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3v11.25" />
							</svg>
							<strong>Compartilhar</strong>
						</p>
						<p className="flex items-center gap-2">
							<span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0">2</span>
							<strong>Adicionar à Tela de Início</strong>
						</p>
						<p className="flex items-center gap-2">
							<span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0">3</span>
							Toque em <strong>Adicionar</strong>
						</p>
					</div>
				) : (
					<div className="text-[13px] text-gray-700 space-y-2.5 mb-4 bg-gray-50 rounded-xl p-4">
						<p className="flex items-center gap-2">
							<span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0">1</span>
							Toque em <strong>&#8942;</strong> (menu do Chrome)
						</p>
						<p className="flex items-center gap-2">
							<span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0">2</span>
							<strong>Adicionar à tela inicial</strong>
						</p>
						<p className="flex items-center gap-2">
							<span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0">3</span>
							Toque em <strong>Instalar</strong>
						</p>
					</div>
				)}

				<button
					type="button"
					onClick={handleDismiss}
					className="w-full py-2 text-[13px] text-gray-400 font-medium"
				>
					Agora não
				</button>
			</div>
		</div>
	)
}
