"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const tabs = ["Ver tudo", "Para pagar", "Para enviar", "Enviado", "Config"]

interface TrackingEvent {
	title: string
	description: string
	date: string
}

interface OrderData {
	storeName: string
	productName: string
	productFullName: string
	productVariant: string
	productPrice: string
	quantity: number
	totalPrice: string
	orderDate: string
	deliveryEstimate: string
	deliveryDate: string
	trackingNumber: string
	shippingMethod: string
	address: string
	phone: string
	productImage: string
	trackingEvents: TrackingEvent[]
}

export default function Home() {
	const [activeTab, setActiveTab] = useState(3)
	const [data, setData] = useState<OrderData | null>(null)
	const [saving, setSaving] = useState(false)
	const [saved, setSaved] = useState(false)
	const [uploading, setUploading] = useState(false)
	const fileRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		fetch("/api/data")
			.then((r) => r.json())
			.then(setData)
	}, [])

	const update = (key: keyof OrderData, value: string | number) => {
		if (!data) return
		setData({ ...data, [key]: value })
	}

	const updateEvent = (index: number, key: keyof TrackingEvent, value: string) => {
		if (!data) return
		const events = [...data.trackingEvents]
		events[index] = { ...events[index], [key]: value }
		setData({ ...data, trackingEvents: events })
	}

	const addEvent = () => {
		if (!data) return
		setData({
			...data,
			trackingEvents: [...data.trackingEvents, { title: "", description: "", date: "" }],
		})
	}

	const removeEvent = (index: number) => {
		if (!data) return
		setData({
			...data,
			trackingEvents: data.trackingEvents.filter((_, i) => i !== index),
		})
	}

	const save = async () => {
		if (!data) return
		setSaving(true)
		await fetch("/api/data", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		})
		setSaving(false)
		setSaved(true)
		setTimeout(() => setSaved(false), 2000)
	}

	const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file || !data) return
		setUploading(true)
		const form = new FormData()
		form.append("file", file)
		const res = await fetch("/api/upload", { method: "POST", body: form })
		const { url } = await res.json()
		setData({ ...data, productImage: url })
		setUploading(false)
	}

	if (!data) {
		return (
			<div className="flex items-center justify-center bg-white" style={{ height: "100dvh" }}>
				<div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
			</div>
		)
	}

	return (
		<div className="bg-white flex flex-col overflow-hidden" style={{ height: "100dvh" }}>
			{/* Tabs */}
			<div className="flex border-b border-gray-100 px-2 pt-3">
				{tabs.map((tab, i) => (
					<button
						key={tab}
						type="button"
						onClick={() => setActiveTab(i)}
						className={`flex-1 pb-3 text-[14px] font-medium relative ${
							i === activeTab ? "text-black" : "text-gray-500"
						}`}
					>
						{tab}
						{i === activeTab && (
							<span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[3px] bg-black rounded-full" />
						)}
					</button>
				))}
			</div>

			{/* Tab Content */}
			{activeTab === 4 ? (
				<SettingsTab
					data={data}
					saving={saving}
					saved={saved}
					uploading={uploading}
					fileRef={fileRef}
					onUpdate={update}
					onUpdateEvent={updateEvent}
					onAddEvent={addEvent}
					onRemoveEvent={removeEvent}
					onSave={save}
					onUploadImage={uploadImage}
				/>
			) : (
				<OrderTab data={data} />
			)}
		</div>
	)
}

function OrderTab({ data }: { data: OrderData }) {
	return (
		<div className="flex-1 bg-white overflow-y-auto">
			<div className="px-4 pt-5 pb-4">
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
					<img
						src={data.productImage}
						alt="Product"
						className="w-[100px] h-[100px] rounded-lg flex-shrink-0 object-cover"
					/>

					<div className="flex-1 min-w-0">
						<p className="text-[14px] text-gray-700 leading-snug mb-1">
							{data.productName}
						</p>
						<p className="text-[13px] text-gray-400 mb-2">{data.productVariant}</p>
						<p className="text-[16px] font-bold text-black">US ${data.productPrice}</p>
					</div>

					<span className="text-[14px] text-gray-400 self-end">x{data.quantity}</span>
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
								<p className="text-[13px] text-gray-400">Data prevista de entrega: {data.deliveryDate}</p>
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
					<p className="text-[15px] font-bold text-black">Total for {data.quantity} items: US ${data.totalPrice}</p>
				</div>

				{/* Action Buttons */}
				<div className="flex gap-3">
					<Link
						href="/tracking"
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
		</div>
	)
}

function SettingsTab({
	data,
	saving,
	saved,
	uploading,
	fileRef,
	onUpdate,
	onUpdateEvent,
	onAddEvent,
	onRemoveEvent,
	onSave,
	onUploadImage,
}: {
	data: OrderData
	saving: boolean
	saved: boolean
	uploading: boolean
	fileRef: React.RefObject<HTMLInputElement | null>
	onUpdate: (key: keyof OrderData, value: string | number) => void
	onUpdateEvent: (index: number, key: keyof TrackingEvent, value: string) => void
	onAddEvent: () => void
	onRemoveEvent: (index: number) => void
	onSave: () => void
	onUploadImage: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
	return (
		<div className="flex-1 bg-gray-50 overflow-y-auto">
			{/* Save button bar */}
			<div className="sticky top-0 z-10 bg-white px-4 py-3 border-b border-gray-100 flex justify-between items-center">
				<p className="text-[15px] font-bold text-black">Configurações</p>
				<button
					type="button"
					onClick={onSave}
					disabled={saving}
					className={`px-5 py-2 rounded-full text-[13px] font-semibold text-white ${
						saved ? "bg-green-500" : "bg-black"
					}`}
				>
					{saving ? "Salvando..." : saved ? "Salvo!" : "Salvar"}
				</button>
			</div>

			{/* Product Image */}
			<div className="bg-white mt-2 px-4 py-4">
				<label className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide">Imagem do produto</label>
				<div className="flex items-center gap-4 mt-2">
					<img
						src={data.productImage}
						alt="Product"
						className="w-20 h-20 rounded-lg object-cover"
					/>
					<div>
						<button
							type="button"
							onClick={() => fileRef.current?.click()}
							className="px-4 py-2 bg-gray-100 rounded-lg text-[13px] font-medium text-black"
						>
							{uploading ? "Enviando..." : "Trocar imagem"}
						</button>
						<input
							ref={fileRef}
							type="file"
							accept="image/*"
							onChange={onUploadImage}
							className="hidden"
						/>
					</div>
				</div>
			</div>

			{/* Store Info */}
			<Section title="Loja">
				<Field label="Nome da loja" value={data.storeName} onChange={(v) => onUpdate("storeName", v)} />
			</Section>

			{/* Product Info */}
			<Section title="Produto">
				<Field label="Nome curto" value={data.productName} onChange={(v) => onUpdate("productName", v)} />
				<Field label="Nome completo" value={data.productFullName} onChange={(v) => onUpdate("productFullName", v)} />
				<Field label="Variante (cor/modelo)" value={data.productVariant} onChange={(v) => onUpdate("productVariant", v)} />
				<Field label="Preço unitário (USD)" value={data.productPrice} onChange={(v) => onUpdate("productPrice", v)} />
				<Field
					label="Quantidade"
					value={String(data.quantity)}
					onChange={(v) => onUpdate("quantity", Number.parseInt(v) || 0)}
					type="number"
				/>
				<Field label="Preço total (USD)" value={data.totalPrice} onChange={(v) => onUpdate("totalPrice", v)} />
			</Section>

			{/* Order Info */}
			<Section title="Pedido">
				<Field label="Data do pedido" value={data.orderDate} onChange={(v) => onUpdate("orderDate", v)} />
				<Field label="Estimativa de entrega" value={data.deliveryEstimate} onChange={(v) => onUpdate("deliveryEstimate", v)} />
				<Field label="Data prevista" value={data.deliveryDate} onChange={(v) => onUpdate("deliveryDate", v)} />
			</Section>

			{/* Shipping Info */}
			<Section title="Envio">
				<Field label="Método de envio" value={data.shippingMethod} onChange={(v) => onUpdate("shippingMethod", v)} />
				<Field label="Número de rastreamento" value={data.trackingNumber} onChange={(v) => onUpdate("trackingNumber", v)} />
				<Field label="Endereço" value={data.address} onChange={(v) => onUpdate("address", v)} />
				<Field label="Telefone" value={data.phone} onChange={(v) => onUpdate("phone", v)} />
			</Section>

			{/* Tracking Events */}
			<div className="bg-white mt-2 px-4 py-4">
				<div className="flex items-center justify-between mb-3">
					<label className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide">
						Eventos de rastreamento
					</label>
					<button
						type="button"
						onClick={onAddEvent}
						className="text-[13px] font-semibold text-blue-600"
					>
						+ Adicionar
					</button>
				</div>
				{data.trackingEvents.map((event, i) => (
					<div key={`evt-${i.toString()}`} className="mb-4 p-3 bg-gray-50 rounded-xl">
						<div className="flex items-center justify-between mb-2">
							<span className="text-[12px] font-bold text-gray-500">Evento {i + 1}</span>
							<button
								type="button"
								onClick={() => onRemoveEvent(i)}
								className="text-[12px] text-red-500 font-medium"
							>
								Remover
							</button>
						</div>
						<Field label="Título" value={event.title} onChange={(v) => onUpdateEvent(i, "title", v)} />
						<Field label="Descrição" value={event.description} onChange={(v) => onUpdateEvent(i, "description", v)} />
						<Field label="Data" value={event.date} onChange={(v) => onUpdateEvent(i, "date", v)} />
					</div>
				))}
			</div>

			<div className="h-8" />
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
