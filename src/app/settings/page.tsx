"use client"

import Link from "next/link"
import { useRef, useState } from "react"
import { type OrderData, type ProductItem, type TrackingEvent, useOrderData } from "@/lib/use-order-data"

export default function SettingsPage() {
	const { data, save, reset } = useOrderData()
	const [saving, setSaving] = useState(false)
	const [saved, setSaved] = useState(false)
	const fileRefs = useRef<(HTMLInputElement | null)[]>([])

	if (!data) {
		return (
			<div className="flex items-center justify-center bg-white" style={{ height: "100dvh" }}>
				<div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
			</div>
		)
	}

	const update = (key: keyof OrderData, value: string | number) => {
		save({ ...data, [key]: value })
	}

	const updateItem = (index: number, key: keyof ProductItem, value: string | number) => {
		const items = [...data.items]
		items[index] = { ...items[index], [key]: value }
		save({ ...data, items })
	}

	const addItem = () => {
		save({
			...data,
			items: [
				{
					productName: "",
					productFullName: "",
					productVariant: "",
					productPrice: "0",
					quantity: 1,
					productImage: "/product.jpg",
				},
				...data.items,
			],
		})
	}

	const removeItem = (index: number) => {
		save({ ...data, items: data.items.filter((_, i) => i !== index) })
	}

	const uploadItemImage = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return
		const reader = new FileReader()
		reader.onload = () => {
			updateItem(index, "productImage", reader.result as string)
		}
		reader.readAsDataURL(file)
	}

	const updateEvent = (index: number, key: keyof TrackingEvent, value: string) => {
		const events = [...data.trackingEvents]
		events[index] = { ...events[index], [key]: value }
		save({ ...data, trackingEvents: events })
	}

	const addEvent = () => {
		save({
			...data,
			trackingEvents: [...data.trackingEvents, { title: "", description: "", date: "" }],
		})
	}

	const removeEvent = (index: number) => {
		save({
			...data,
			trackingEvents: data.trackingEvents.filter((_, i) => i !== index),
		})
	}

	const handleSave = () => {
		setSaving(true)
		save(data)
		setSaving(false)
		setSaved(true)
		setTimeout(() => setSaved(false), 2000)
	}

	return (
		<div className="bg-gray-50 flex flex-col" style={{ height: "100dvh" }}>
			{/* Header */}
			<div className="flex items-center justify-between px-4 py-3.5 bg-white border-b border-gray-100">
				<div className="flex items-center">
					<Link href="/" className="mr-3">
						<svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
							<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
						</svg>
					</Link>
					<h1 className="text-[18px] font-bold text-black">Configurações</h1>
				</div>
				<button
					type="button"
					onClick={handleSave}
					disabled={saving}
					className={`px-5 py-2 rounded-full text-[13px] font-semibold text-white ${
						saved ? "bg-green-500" : "bg-black"
					}`}
				>
					{saving ? "Salvando..." : saved ? "Salvo!" : "Salvar"}
				</button>
			</div>

			{/* Form */}
			<div className="flex-1 overflow-y-auto">
				{/* Store Info */}
				<Section title="Loja">
					<Field label="Nome da loja" value={data.storeName} onChange={(v) => update("storeName", v)} />
				</Section>

				{/* Items */}
				<div className="bg-white mt-2 px-4 py-4">
					<div className="flex items-center justify-between mb-3">
						<label className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide">Itens do pedido</label>
						<button type="button" onClick={addItem} className="text-[13px] font-semibold text-blue-600">
							+ Adicionar item
						</button>
					</div>

					{data.items.map((item, i) => (
						<div key={`item-${i.toString()}`} className="mb-4 p-3 bg-gray-50 rounded-xl">
							<div className="flex items-center justify-between mb-3">
								<span className="text-[12px] font-bold text-gray-500">Item {i + 1}</span>
								{data.items.length > 1 && (
									<button type="button" onClick={() => removeItem(i)} className="text-[12px] text-red-500 font-medium">
										Remover
									</button>
								)}
							</div>

							{/* Item Image */}
							<div className="flex items-center gap-3 mb-3">
								<img src={item.productImage} alt="Product" className="w-14 h-14 rounded-lg object-cover bg-white" />
								<button
									type="button"
									onClick={() => fileRefs.current[i]?.click()}
									className="px-3 py-1.5 bg-white rounded-lg text-[12px] font-medium text-black border border-gray-200"
								>
									Trocar imagem
								</button>
								<input
									ref={(el) => { fileRefs.current[i] = el }}
									type="file"
									accept="image/*"
									onChange={(e) => uploadItemImage(i, e)}
									className="hidden"
								/>
							</div>

							<Field label="Nome curto" value={item.productName} onChange={(v) => updateItem(i, "productName", v)} />
							<Field label="Nome completo" value={item.productFullName} onChange={(v) => updateItem(i, "productFullName", v)} />
							<Field label="Variante" value={item.productVariant} onChange={(v) => updateItem(i, "productVariant", v)} />
							<Field label="Preço (USD)" value={item.productPrice} onChange={(v) => updateItem(i, "productPrice", v)} />
							<Field
								label="Quantidade"
								value={String(item.quantity)}
								onChange={(v) => updateItem(i, "quantity", Number.parseInt(v) || 0)}
								type="number"
							/>
						</div>
					))}
				</div>

				{/* Order Info */}
				<Section title="Pedido">
					<Field label="Preço total (USD)" value={data.totalPrice} onChange={(v) => update("totalPrice", v)} />
					<Field label="Data do pedido" value={data.orderDate} onChange={(v) => update("orderDate", v)} />
					<Field label="Estimativa de entrega" value={data.deliveryEstimate} onChange={(v) => update("deliveryEstimate", v)} />
					<Field label="Data prevista" value={data.deliveryDate} onChange={(v) => update("deliveryDate", v)} />
				</Section>

				{/* Shipping Info */}
				<Section title="Envio">
					<Field label="Método de envio" value={data.shippingMethod} onChange={(v) => update("shippingMethod", v)} />
					<Field label="Número de rastreamento" value={data.trackingNumber} onChange={(v) => update("trackingNumber", v)} />
					<Field label="Endereço" value={data.address} onChange={(v) => update("address", v)} />
					<Field label="Telefone" value={data.phone} onChange={(v) => update("phone", v)} />
				</Section>

				{/* Tracking Events */}
				<div className="bg-white mt-2 px-4 py-4">
					<div className="flex items-center justify-between mb-3">
						<label className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide">
							Eventos de rastreamento
						</label>
						<button type="button" onClick={addEvent} className="text-[13px] font-semibold text-blue-600">
							+ Adicionar
						</button>
					</div>
					{data.trackingEvents.map((event, i) => (
						<div key={`evt-${i.toString()}`} className="mb-4 p-3 bg-gray-50 rounded-xl">
							<div className="flex items-center justify-between mb-2">
								<span className="text-[12px] font-bold text-gray-500">Evento {i + 1}</span>
								<button type="button" onClick={() => removeEvent(i)} className="text-[12px] text-red-500 font-medium">
									Remover
								</button>
							</div>
							<Field label="Título" value={event.title} onChange={(v) => updateEvent(i, "title", v)} />
							<Field label="Descrição" value={event.description} onChange={(v) => updateEvent(i, "description", v)} />
							<Field label="Data" value={event.date} onChange={(v) => updateEvent(i, "date", v)} />
						</div>
					))}
				</div>

				{/* Reset */}
				<div className="px-4 py-4">
					<button
						type="button"
						onClick={reset}
						className="w-full py-3 border border-red-300 rounded-xl text-[14px] font-medium text-red-500"
					>
						Restaurar padrão
					</button>
				</div>

				<div className="h-8" />
			</div>
		</div>
	)
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
	return (
		<div className="bg-white mt-2 px-4 py-4">
			<label className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide mb-2 block">{title}</label>
			{children}
		</div>
	)
}

function Field({
	label,
	value,
	onChange,
	type = "text",
}: {
	label: string
	value: string
	onChange: (v: string) => void
	type?: string
}) {
	return (
		<div className="mb-3">
			<label className="text-[13px] text-gray-500 block mb-1">{label}</label>
			<input
				type={type}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[14px] text-black outline-none focus:border-black transition-colors"
			/>
		</div>
	)
}
