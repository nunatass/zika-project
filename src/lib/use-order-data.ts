"use client"

import { useCallback, useEffect, useState } from "react"

export interface TrackingEvent {
	title: string
	description: string
	date: string
}

export interface OrderData {
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

const STORAGE_KEY = "aliexpress-order-data"

const defaultData: OrderData = {
	storeName: "ShenZhen Menglin Electronics Store",
	productName: "Repetidor wi-fi sem fio, amplificador de re...",
	productFullName: "Wireless WIFI Repeater Wi Fi Booster Amplifier Network Expander Router Power Antenna for Rou...",
	productVariant: "EU",
	productPrice: "5.65",
	quantity: 12,
	totalPrice: "113.66",
	orderDate: "2 mar, 2026",
	deliveryEstimate: "Mar. 16 - Apr. 04",
	deliveryDate: "4 abr, 2026",
	trackingNumber: "EC237054577BE",
	shippingMethod: "CAINIAO_STANDARD",
	address: "Palmarejo,Praia,Santiago,Cape Verde 7600",
	phone: "K********************************a +238 98**533",
	productImage: "/product.jpg",
	trackingEvents: [
		{
			title: "Desembaraço aduaneiro iniciado",
			description: "Início do desembaraço aduaneiro de importação",
			date: "Sáb. | Mar. 07 08:37",
		},
		{
			title: "Em trânsito",
			description: "Seu pacote chegou ao aeroporto local",
			date: "Sáb. | Mar. 07 06:26",
		},
		{
			title: "Em trânsito",
			description: "Seu pacote saiu do centro de distribuição",
			date: "Sex. | Mar. 06 22:15",
		},
		{
			title: "Em trânsito",
			description: "Seu pacote chegou ao país de destino",
			date: "Sex. | Mar. 06 18:42",
		},
		{
			title: "Em trânsito",
			description: "Seu pacote saiu do país de origem",
			date: "Qui. | Mar. 05 14:30",
		},
	],
}

export function useOrderData() {
	const [data, setData] = useState<OrderData | null>(null)

	useEffect(() => {
		const stored = localStorage.getItem(STORAGE_KEY)
		if (stored) {
			try {
				setData(JSON.parse(stored))
			} catch {
				setData(defaultData)
			}
		} else {
			setData(defaultData)
		}
	}, [])

	const save = useCallback((newData: OrderData) => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(newData))
		setData(newData)
	}, [])

	return { data, save }
}
