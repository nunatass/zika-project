"use client"

import { useEffect, useState } from "react"

export function FullscreenProvider() {
	const [showPrompt, setShowPrompt] = useState(false)
	const [isIOS, setIsIOS] = useState(false)

	useEffect(() => {
		// Check if already running as PWA
		const isStandalone =
			window.matchMedia("(display-mode: standalone)").matches ||
			(navigator as Navigator & { standalone?: boolean }).standalone === true

		if (isStandalone) return

		const ios = /iPad|iPhone|iPod/.test(navigator.userAgent)
		setIsIOS(ios)
		setShowPrompt(true)
	}, [])

	if (!showPrompt) return null

	return (
		<div className="fixed inset-0 z-50 bg-black/60 flex items-end justify-center pb-8 px-4">
			<div className="bg-white rounded-2xl p-5 w-full max-w-sm">
				<p className="text-[16px] font-bold text-black mb-1">Instalar aplicativo</p>
				<p className="text-[13px] text-gray-500 mb-4">
					Para uma experiência em tela cheia sem barra do navegador:
				</p>

				{isIOS ? (
					<div className="text-[13px] text-gray-700 space-y-2 mb-4">
						<p>1. Toque no botão <span className="inline-block">
							<svg className="w-5 h-5 inline -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3v11.25" />
							</svg>
						</span> (Compartilhar)</p>
						<p>2. Selecione <strong>&quot;Adicionar à Tela de Início&quot;</strong></p>
						<p>3. Toque em <strong>&quot;Adicionar&quot;</strong></p>
					</div>
				) : (
					<div className="text-[13px] text-gray-700 space-y-2 mb-4">
						<p>1. Toque no menu <strong>&#8942;</strong> (três pontos) do Chrome</p>
						<p>2. Selecione <strong>&quot;Adicionar à tela inicial&quot;</strong></p>
						<p>3. Toque em <strong>&quot;Adicionar&quot;</strong></p>
					</div>
				)}

				<button
					type="button"
					onClick={() => setShowPrompt(false)}
					className="w-full py-3 bg-black text-white text-[15px] font-semibold rounded-full"
				>
					Entendi
				</button>
			</div>
		</div>
	)
}
