"use client"

import Link from "next/link"
import { useState } from "react"
import { useOrderData } from "@/lib/use-order-data"

export default function TrackingPage() {
	const [expanded, setExpanded] = useState(false)
	const { data } = useOrderData()

	if (!data) {
		return (
			<div className="flex items-center justify-center bg-white" style={{ height: "100dvh" }}>
				<div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
			</div>
		)
	}

	const visibleEvents = expanded ? data.trackingEvents : data.trackingEvents.slice(0, 2)
	return (
		<div className="bg-white flex flex-col overflow-y-auto" style={{ height: "100dvh" }}>
			{/* Header */}
			<div className="flex items-center px-4 py-3.5 bg-white">
				<Link href="/" className="mr-4">
					<svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
						<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
					</svg>
				</Link>
				<h1 className="text-[18px] font-bold text-black">Rastreamento</h1>
			</div>

			{/* Delivery Estimate Banner */}
			<div className="mx-0 bg-gradient-to-r from-green-50 to-green-100/50 px-4 py-4">
				<div className="flex items-center gap-2">
					<h2 className="text-[20px] font-bold text-black">Entrega:{data.deliveryEstimate}</h2>
					<svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
						<path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
					</svg>
				</div>
				<div className="mt-3 h-1 bg-green-200 rounded-full overflow-hidden">
					<div className="h-full bg-green-500 rounded-full" style={{ width: "65%" }} />
				</div>
			</div>

			{/* Shipping Info */}
			<div className="px-4 pt-4 pb-2">
				<p className="text-[13px] text-gray-400 mb-0.5">{data.shippingMethod}</p>
				<div className="flex items-center justify-between">
					<p className="text-[14px] text-black">
						Número de rastreamento: <span className="font-bold">{data.trackingNumber}</span>
					</p>
					<button type="button" className="text-[14px] text-blue-600 font-medium">
						Copiar
					</button>
				</div>
			</div>

			{/* Tracking Timeline */}
			<div className="px-4 pt-4 pb-2">
				<div className="relative">
					{visibleEvents.map((event, index) => (
						<div key={`event-${index.toString()}`} className="flex gap-3 relative">
							<div className="flex flex-col items-center">
								<div className={`w-3 h-3 rounded-full flex-shrink-0 mt-1 ${index === 0 ? "bg-black" : "bg-gray-300"}`} />
								{index < visibleEvents.length - 1 && <div className="w-px flex-1 bg-gray-200 my-1" />}
								{!expanded && index === visibleEvents.length - 1 && <div className="w-px h-4 bg-gray-200 my-1" />}
							</div>
							<div className="pb-5 flex-1">
								<p className={`text-[15px] leading-snug ${index === 0 ? "font-bold text-black" : "text-gray-400"}`}>{event.title}</p>
								<p className={`text-[13px] mt-0.5 leading-snug ${index === 0 ? "text-gray-600" : "text-gray-400"}`}>{event.description}</p>
								<p className={`text-[13px] mt-1 ${index === 0 ? "text-gray-500" : "text-gray-400"}`}>{event.date}</p>
							</div>
						</div>
					))}

					{!expanded && data.trackingEvents.length > 2 && (
						<button type="button" onClick={() => setExpanded(true)} className="flex items-center gap-1 ml-6 text-[14px] text-gray-500">
							<div className="flex flex-col items-center absolute left-0">
								<div className="w-3 h-3 rounded-full bg-gray-300 flex-shrink-0" />
							</div>
							Ver mais
							<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
							</svg>
						</button>
					)}
				</div>
			</div>

			{/* Delivery Address */}
			<div className="px-4 py-5 mt-2">
				<div className="flex items-start gap-3">
					<div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
						<svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
							<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
						</svg>
					</div>
					<div>
						<p className="text-[14px] text-black">{data.address}</p>
						<p className="text-[13px] text-gray-400 mt-0.5">{data.phone}</p>
					</div>
				</div>
			</div>

			<div className="h-2 bg-gray-100" />

			{/* Promotional Cards */}
			<div className="px-4 py-4 flex gap-3">
				<div className="flex-1 bg-amber-50 rounded-xl p-4">
					<p className="text-[14px] font-bold text-black mb-0.5">Ganhe moedas agora</p>
					<p className="text-[12px] text-gray-500 mb-3">Visite hoje para economizar</p>
					<button type="button" className="bg-black text-white text-[12px] font-medium px-4 py-1.5 rounded-full">Coletar</button>
				</div>
				<div className="flex-1 bg-blue-50 rounded-xl p-4">
					<p className="text-[14px] font-bold text-black mb-0.5">Cashback</p>
					<p className="text-[12px] text-gray-500 mb-3">Até -10%</p>
					<button type="button" className="bg-black text-white text-[12px] font-medium px-4 py-1.5 rounded-full">Comprar agora</button>
				</div>
			</div>

			<div className="h-2 bg-gray-100" />

			{/* Packed Items */}
			<div className="px-4 py-4">
				<h3 className="text-[17px] font-bold text-black mb-4">Itens embalados</h3>
				{data.items.map((item, i) => (
					<div key={`packed-${i.toString()}`} className="flex gap-3 items-center mb-4">
						<img src={item.productImage} alt="Product" className="w-[72px] h-[72px] rounded-lg flex-shrink-0 object-cover bg-gray-50" />
						<div className="flex-1 min-w-0">
							<p className="text-[13px] text-gray-700 leading-snug">{item.productFullName}</p>
							<p className="text-[12px] text-gray-400 mt-1">Color:{item.productVariant}</p>
						</div>
						<span className="text-[14px] text-gray-400 self-start font-medium">x{item.quantity}</span>
					</div>
				))}
			</div>

			<div className="h-2 bg-gray-100" />

			{/* You might like */}
			<div className="px-4 py-4 pb-8">
				<h3 className="text-[17px] font-bold text-black mb-4">Você vai adorar</h3>
				<div className="flex gap-3">
					<div className="flex-1 bg-gray-100 rounded-xl h-12 flex items-center justify-center">
						<span className="text-[11px] font-bold text-gray-800 tracking-wider uppercase">ZENOTTIC</span>
						<span className="block text-[7px] text-gray-500 tracking-widest uppercase ml-0.5">EYEWEAR</span>
					</div>
					<div className="flex-1 bg-gray-100 rounded-xl h-12 flex items-center justify-center">
						<span className="text-[11px] font-bold text-gray-800 tracking-wider uppercase">ZENOTTIC</span>
						<span className="block text-[7px] text-gray-500 tracking-widest uppercase ml-0.5">EYEWEAR</span>
					</div>
				</div>
			</div>

			<div className="h-6" />
		</div>
	)
}
