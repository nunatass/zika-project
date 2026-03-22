"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useOrderData } from "@/lib/use-order-data"

export default function OrderDetailPage() {
	const params = useParams()
	const itemIndex = Number(params.id)
	const { data } = useOrderData()

	if (!data) {
		return (
			<div className="flex items-center justify-center bg-white" style={{ height: "100dvh" }}>
				<div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
			</div>
		)
	}

	const item = data.items[itemIndex]
	if (!item) {
		return (
			<div className="flex flex-col items-center justify-center bg-white gap-4" style={{ height: "100dvh" }}>
				<p className="text-[15px] text-gray-500">Item não encontrado</p>
				<Link href="/" className="text-[14px] text-blue-600 font-medium">Voltar</Link>
			</div>
		)
	}

	const visibleEvents = item.trackingEvents.slice(0, 2)

	return (
		<div className="bg-white flex flex-col" style={{ height: "100dvh" }}>
			{/* Header */}
			<div className="flex items-center justify-between px-4 py-3.5 bg-white border-b border-gray-100">
				<div className="flex items-center">
					<Link href="/" className="mr-3">
						<svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
							<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
						</svg>
					</Link>
					<h1 className="text-[18px] font-bold text-black">Aguardando a entrega</h1>
				</div>
				<button type="button" className="p-1">
					<svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
						<path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
					</svg>
				</button>
			</div>

			{/* Scrollable content */}
			<div className="flex-1 overflow-y-auto">
				{/* Auto-confirm message */}
				<div className="px-4 py-4 bg-white">
					<p className="text-[13px] text-gray-600 leading-relaxed">
						O sistema confirmará automaticamente o recebimento após 56 dias.Se o item que você recebeu estiver com defeito ou não conforme descrito, você poderá abrir uma disputa dentro de 15 dias após o recebimento.
					</p>
				</div>

				<div className="h-2 bg-gray-100" />

				{/* Delivery Period */}
				<div className="px-4 py-4">
					<h2 className="text-[18px] font-bold text-black">Período de entrega:{item.deliveryEstimate}</h2>
				</div>

				{/* Tracking Summary */}
				<div className="px-4 pb-4">
					<div className="flex items-center justify-between mb-3">
						<div className="flex items-center gap-2">
							<div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
								<svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
								</svg>
							</div>
							<span className="text-[15px] font-bold text-black">{visibleEvents[0]?.title || "Mise à jour douanière"}</span>
						</div>
						<Link href={`/tracking/${itemIndex}`} className="text-[14px] text-blue-600 font-medium">
							Ver tudo {">"}
						</Link>
					</div>

					{visibleEvents.map((event, index) => (
						<div key={`evt-${index.toString()}`} className={`ml-3 pl-5 pb-3 ${index < visibleEvents.length - 1 ? "border-l-2 border-gray-200" : ""}`}>
							<div className={`px-4 py-3 rounded-xl ${index === 0 ? "bg-gray-100" : ""}`}>
								<p className={`text-[14px] leading-snug ${index === 0 ? "text-black font-medium" : "text-gray-400"}`}>{event.description}</p>
								<p className={`text-[12px] mt-1 ${index === 0 ? "text-gray-500" : "text-gray-400"}`}>{event.date}</p>
							</div>
						</div>
					))}
				</div>

				<div className="h-2 bg-gray-100" />

				{/* Delivery Address */}
				<div className="px-4 py-4">
					<div className="flex items-start gap-3">
						<div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
							<svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
							</svg>
						</div>
						<div>
							<p className="text-[15px] font-bold text-black mb-1">Endereço de entrega</p>
							<p className="text-[14px] text-gray-700">{data.address}</p>
							<p className="text-[13px] text-gray-500 mt-0.5">{data.contactName} {data.phone}</p>
						</div>
					</div>
				</div>

				<div className="h-2 bg-gray-100" />

				{/* Store + Product */}
				<div className="px-4 py-4">
					{/* Store header */}
					<div className="flex items-center gap-2 mb-4">
						<h3 className="text-[16px] font-bold text-black truncate max-w-[160px]">{data.storeName}</h3>
						<svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
							<path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
						</svg>
						<button type="button" className="flex items-center gap-1 ml-auto text-[13px] text-blue-600 font-medium">
							<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
							</svg>
							Entrar em contato com vendedor
						</button>
					</div>

					{/* Product */}
					<div className="flex gap-3 mb-4">
						<img src={item.productImage} alt="Product" className="w-[100px] h-[100px] rounded-lg flex-shrink-0 object-cover bg-gray-50" />
						<div className="flex-1 min-w-0">
							<p className="text-[14px] text-gray-700 leading-snug mb-1">{item.productFullName}</p>
							<p className="text-[13px] text-gray-400 mb-2">{item.productVariant}</p>
							<p className="text-[16px] font-bold text-black">US ${item.productPrice}</p>
						</div>
						<span className="text-[14px] text-gray-400 self-start font-medium">x{item.quantity}</span>
					</div>

					{/* Action buttons */}
					<div className="flex gap-3 mb-5">
						<button type="button" className="flex-1 py-2.5 border border-gray-300 rounded-full text-center text-[13px] font-medium text-black">
							Add to cart
						</button>
						<button type="button" className="flex-1 py-2.5 border border-gray-300 rounded-full text-center text-[13px] font-medium text-black">
							Devolução/reembolso
						</button>
					</div>

					{/* Price breakdown */}
					<div className="space-y-2 mb-2">
						<div className="flex justify-between">
							<span className="text-[14px] text-gray-500">Subtotal</span>
							<span className="text-[14px] text-gray-500">US ${data.subtotal}</span>
						</div>
						<div className="flex justify-between">
							<span className="text-[14px] text-gray-500">Shipping</span>
							<span className="text-[14px] text-gray-500">US ${data.shipping}</span>
						</div>
						{Number(data.couponDiscount) > 0 && (
							<div className="flex justify-between">
								<span className="text-[14px] text-red-500 font-medium">AliExpress Coupons</span>
								<span className="text-[14px] text-red-500 font-medium">-US ${data.couponDiscount}</span>
							</div>
						)}
						<div className="flex justify-between pt-1">
							<span className="text-[16px] font-bold text-black">Total</span>
							<div className="flex items-center gap-1">
								<span className="text-[16px] font-bold text-black">US ${data.totalPrice}</span>
								<svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
								</svg>
							</div>
						</div>
					</div>
				</div>

				<div className="h-2 bg-gray-100" />

				{/* AliExpress Commitment */}
				<div className="bg-red-50 px-4 py-3">
					<h3 className="text-[16px] font-bold text-black">Compromisso do AliExpress</h3>
				</div>

				<div className="px-4 py-4 border-b border-gray-100">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<svg className="w-6 h-6 text-gray-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
							</svg>
							<div>
								<p className="text-[15px] font-bold text-black">Garantia de envio</p>
								<p className="text-[13px] text-gray-500 mt-0.5">Obtenha um cupom se seu pedido não for enviado dentro do prazo prometido</p>
							</div>
						</div>
						<svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
							<path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
						</svg>
					</div>
				</div>

				<div className="px-4 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<svg className="w-6 h-6 text-gray-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
							</svg>
							<div>
								<p className="text-[15px] font-bold text-black">Política de Devolução e Reembolso</p>
								<p className="text-[13px] text-gray-500 mt-0.5">Elegível para devoluções e reembolsos, dentro do período de proteção do pedido designado</p>
							</div>
						</div>
						<svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
							<path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
						</svg>
					</div>
				</div>

				<div className="h-6" />
			</div>

			{/* Fixed Bottom Buttons */}
			<div className="flex gap-3 px-4 py-3 bg-white border-t border-gray-100">
				<Link
					href={`/tracking/${itemIndex}`}
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
	)
}
