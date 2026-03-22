"use client"

import { useCallback, useEffect, useState } from "react"

export interface TrackingEvent {
	title: string
	description: string
	date: string
}

export interface ProductItem {
	productName: string
	productFullName: string
	productVariant: string
	productPrice: string
	quantity: number
	productImage: string
	trackingNumber: string
	shippingMethod: string
	deliveryEstimate: string
	deliveryDate: string
	trackingEvents: TrackingEvent[]
}

export interface OrderData {
	storeName: string
	items: ProductItem[]
	totalPrice: string
	subtotal: string
	shipping: string
	couponDiscount: string
	orderDate: string
	address: string
	phone: string
	contactName: string
}

const STORAGE_KEY = "aliexpress-order-data"

const defaultData: OrderData = {
	storeName: "ShenZhen Menglin Electronics Store",
	items: [
		{
			productName: "Repetidor wi-fi sem fio, amplificador de re...",
			productFullName: "Wireless WIFI Repeater Wi Fi Booster Amplifier Network Expander Router Power Antenna for Rou...",
			productVariant: "EU",
			productPrice: "5.65",
			quantity: 12,
			productImage: "/product.jpg",
			trackingNumber: "EC237054577BE",
			shippingMethod: "CAINIAO_STANDARD",
			deliveryEstimate: "Mar. 16 - Apr. 04",
			deliveryDate: "4 abr, 2026",
			trackingEvents: [
				{ title: "Desembaraço aduaneiro iniciado", description: "Início do desembaraço aduaneiro de importação", date: "Sáb. | Mar. 07 08:37" },
				{ title: "Em trânsito", description: "Seu pacote chegou ao aeroporto local", date: "Sáb. | Mar. 07 06:26" },
				{ title: "Em trânsito", description: "Seu pacote saiu do centro de distribuição", date: "Sex. | Mar. 06 22:15" },
				{ title: "Em trânsito", description: "Seu pacote chegou ao país de destino", date: "Sex. | Mar. 06 18:42" },
				{ title: "Em trânsito", description: "Seu pacote saiu do país de origem", date: "Qui. | Mar. 05 14:30" },
			],
		},
		{
			productName: "2TB OTG USB Flash Drive USB 3.0 Type C...",
			productFullName: "2TB OTG USB Flash Drive USB 3.0 Type C For iPhone ipad 1TB 512GB 256G Pendrive Samsung Huawei Xiaomi Android Laptop Memory Stick",
			productVariant: "2TB / Black",
			productPrice: "3.20",
			quantity: 5,
			productImage: "/pen.png",
			trackingNumber: "LP237098412CN",
			shippingMethod: "CAINIAO_STANDARD",
			deliveryEstimate: "Mar. 20 - Apr. 10",
			deliveryDate: "10 abr, 2026",
			trackingEvents: [
				{ title: "Em trânsito", description: "Seu pacote saiu do país de origem", date: "Sáb. | Mar. 08 10:15" },
				{ title: "Pedido enviado", description: "O vendedor enviou seu pedido", date: "Sex. | Mar. 07 16:30" },
			],
		},
	],
	totalPrice: "110.97",
	subtotal: "68.04",
	shipping: "49.93",
	couponDiscount: "7.00",
	orderDate: "2 mar, 2026",
	address: "Palmarejo, Praia, Santiago, Cape Verde 7600",
	phone: "+238 5981060",
	contactName: "Ricardo Montrond Rodrigues Silva Roque",
}

export function useOrderData() {
	const [data, setData] = useState<OrderData | null>(null)

	useEffect(() => {
		try {
			const stored = localStorage.getItem(STORAGE_KEY)
			if (stored) {
				const parsed = JSON.parse(stored)
				if (Array.isArray(parsed.items) && parsed.items.length > 0 && parsed.items[0].trackingEvents) {
					setData(parsed)
					return
				}
			}
		} catch {
			// ignore
		}
		localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData))
		setData(defaultData)
	}, [])

	const save = useCallback((newData: OrderData) => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(newData))
		setData(newData)
	}, [])

	const reset = useCallback(() => {
		localStorage.removeItem(STORAGE_KEY)
		setData(defaultData)
	}, [])

	return { data, save, reset }
}
