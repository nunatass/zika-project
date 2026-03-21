"use client"

import Link from "next/link"
import { useState } from "react"
import { useOrderData } from "@/lib/use-order-data"

const tabs = ["Ver tudo", "Para pagar", "Para enviar", "Enviado"]

export default function Home() {
	const [activeTab, setActiveTab] = useState(3)
	const { data } = useOrderData()

	if (!data) {
		return (
			<div className="flex items-center justify-center bg-white" style={{ height: "100dvh" }}>
				<div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
			</div>
		)
	}

	return (
		<div className="bg-white flex flex-col overflow-hidden" style={{ height: "100dvh" }}>
			{/* Top Header Bar */}
			<div className="flex items-center gap-2 px-3 py-2.5 bg-white border-b border-gray-100">
				<Link href="/" className="flex-shrink-0 p-1">
					<svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
						<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
					</svg>
				</Link>
				<div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2.5">
					<svg className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
						<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
					</svg>
					<input type="text" placeholder="" className="bg-transparent outline-none text-[14px] text-black w-full" readOnly />
				</div>
				<button type="button" className="flex-shrink-0 p-1">
					<svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
						<path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
					</svg>
				</button>
				<button type="button" className="flex-shrink-0 p-1">
					<svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
						<path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
					</svg>
				</button>
				<Link href="/settings" className="flex-shrink-0 p-1">
					<svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
						<path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
						<path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
					</svg>
				</Link>
			</div>

			{/* Tabs */}
			<div className="flex border-b border-gray-100 px-4 pt-2">
				{tabs.map((tab, i) => (
					<button
						key={tab}
						type="button"
						onClick={() => setActiveTab(i)}
						className={`flex-1 pb-3 text-[15px] font-medium relative ${i === activeTab ? "text-black" : "text-gray-500"}`}
					>
						{tab}
						{i === activeTab && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[3px] bg-black rounded-full" />}
					</button>
				))}
			</div>

			{/* Items */}
			<div className="flex-1 bg-white overflow-y-auto">
				{data.items.map((item, i) => (
					<div key={`order-${i.toString()}`} className="px-4 pt-5 pb-4 border-b-8 border-gray-100">
						{/* Status Header */}
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-[17px] font-bold text-black">Aguardando a entrega</h2>
							<span className="text-[13px] text-gray-400">{data.orderDate}</span>
						</div>

						<div className="h-px bg-gray-100 -mx-4 mb-4" />

						{/* Store Name */}
						<div className="flex items-center mb-4">
							<h3 className="text-[16px] font-bold text-black">{data.storeName}</h3>
							<svg className="w-5 h-5 ml-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
							</svg>
						</div>

						{/* Product */}
						<div className="flex gap-3 mb-5">
							<img src={item.productImage} alt="Product" className="w-[100px] h-[100px] rounded-lg flex-shrink-0 object-cover bg-gray-50" />
							<div className="flex-1 min-w-0">
								<p className="text-[14px] text-gray-700 leading-snug mb-1">{item.productName}</p>
								<p className="text-[13px] text-gray-400 mb-2">{item.productVariant}</p>
								<p className="text-[16px] font-bold text-black">US ${item.productPrice}</p>
							</div>
							<span className="text-[14px] text-gray-400 self-end">x{item.quantity}</span>
						</div>

						{/* Tracking Info Card */}
						<div className="bg-gray-50 rounded-xl p-4 mb-5">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
										<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
									</svg>
									<div>
										<p className="text-[14px] font-semibold text-black">Ver detalhes do rastreamento</p>
										<p className="text-[13px] text-gray-400">Data prevista de entrega: {item.deliveryDate}</p>
									</div>
								</div>
								<svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
								</svg>
							</div>
						</div>

						<div className="h-px bg-gray-100 -mx-4 mb-4" />

						{/* Total */}
						<div className="text-right mb-5">
							<p className="text-[15px] font-bold text-black">
								Total for {item.quantity} items: US ${(Number.parseFloat(item.productPrice) * item.quantity).toFixed(2)}
							</p>
						</div>

						{/* Action Buttons */}
						<div className="flex gap-3">
							<Link
								href={`/tracking/${i}`}
								className="flex-1 py-3 border border-gray-300 rounded-full text-center text-[14px] font-medium text-black"
							>
								Track order
							</Link>
							<button
								type="button"
								className="flex-1 py-3 border-2 border-red-500 rounded-full text-center text-[14px] font-medium text-red-500"
							>
								Confirmar entrega
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
