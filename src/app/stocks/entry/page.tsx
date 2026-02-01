'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function StockEntryPage() {
    const [entries, setEntries] = useState<{
        productId: string
        productName: string
        quantity: number
        expiryDate: string
        batchNumber: string
    }[]>([])

    const products = [
        { id: '1', name: 'Pâtes (500g)', category: 'Épicerie', unit: 'paquets' },
        { id: '2', name: 'Riz (1kg)', category: 'Épicerie', unit: 'sachets' },
        { id: '3', name: 'Lait UHT (1L)', category: 'Produits laitiers', unit: 'bouteilles' },
        { id: '4', name: 'Huile (1L)', category: 'Épicerie', unit: 'bouteilles' },
        { id: '5', name: 'Sucre (1kg)', category: 'Épicerie', unit: 'paquets' },
        { id: '6', name: 'Farine (1kg)', category: 'Épicerie', unit: 'paquets' },
        { id: '7', name: 'Conserve légumes', category: 'Conserves', unit: 'boîtes' },
        { id: '8', name: 'Café (250g)', category: 'Boissons', unit: 'paquets' },
    ]

    const sources = [
        'Banque Alimentaire',
        'Don particulier',
        'Don entreprise',
        'Collecte supermarché',
        'Achat association',
        'Transfert autre centre',
    ]

    const [selectedProduct, setSelectedProduct] = useState('')
    const [quantity, setQuantity] = useState('')
    const [expiryDate, setExpiryDate] = useState('')
    const [batchNumber, setBatchNumber] = useState('')
    const [source, setSource] = useState('')
    const [notes, setNotes] = useState('')

    const addEntry = () => {
        const product = products.find(p => p.id === selectedProduct)
        if (product && quantity) {
            setEntries([...entries, {
                productId: product.id,
                productName: product.name,
                quantity: parseInt(quantity),
                expiryDate,
                batchNumber,
            }])
            setSelectedProduct('')
            setQuantity('')
            setExpiryDate('')
            setBatchNumber('')
        }
    }

    const removeEntry = (index: number) => {
        setEntries(entries.filter((_, i) => i !== index))
    }

    const totalItems = entries.reduce((sum, entry) => sum + entry.quantity, 0)

    return (
        <div className="animate-fade-in">
            {/* Page Header */}
            <div className="page-header">
                <div className="flex items-center gap-4 mb-4">
                    <Link href="/stocks" className="btn btn-ghost btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: 18, height: 18 }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                        Retour
                    </Link>
                </div>
                <h1 className="page-title">Entrée de Stock</h1>
                <p className="page-description">Enregistrer une nouvelle réception de marchandises</p>
            </div>

            <div className="grid" style={{ gridTemplateColumns: '1fr 400px', gap: 'var(--space-6)' }}>
                {/* Left - Form */}
                <div className="card">
                    {/* Source Section */}
                    <div style={{ marginBottom: 'var(--space-6)' }}>
                        <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 'var(--space-4)' }}>
                            Informations générales
                        </h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-group">
                                <label className="label">Source de la marchandise *</label>
                                <select
                                    className="input select"
                                    value={source}
                                    onChange={(e) => setSource(e.target.value)}
                                >
                                    <option value="">Sélectionner une source</option>
                                    {sources.map(src => (
                                        <option key={src} value={src}>{src}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="label">Date de réception</label>
                                <input
                                    type="date"
                                    className="input"
                                    defaultValue={new Date().toISOString().split('T')[0]}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="label">Notes / Référence</label>
                            <input
                                type="text"
                                className="input"
                                placeholder="Ex: Livraison BA #12345"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Add Products */}
                    <div>
                        <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 'var(--space-4)' }}>
                            Ajouter des produits
                        </h2>

                        <div style={{
                            background: 'var(--neutral-50)',
                            padding: 'var(--space-5)',
                            borderRadius: 'var(--radius-xl)',
                            marginBottom: 'var(--space-4)'
                        }}>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                    <label className="label">Produit *</label>
                                    <select
                                        className="input select"
                                        value={selectedProduct}
                                        onChange={(e) => setSelectedProduct(e.target.value)}
                                    >
                                        <option value="">Sélectionner un produit</option>
                                        {products.map(product => (
                                            <option key={product.id} value={product.id}>
                                                {product.name} ({product.category})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                    <label className="label">Quantité *</label>
                                    <input
                                        type="number"
                                        className="input"
                                        placeholder="0"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                    <label className="label">Date de péremption</label>
                                    <input
                                        type="date"
                                        className="input"
                                        value={expiryDate}
                                        onChange={(e) => setExpiryDate(e.target.value)}
                                    />
                                </div>
                                <div className="form-group" style={{ marginBottom: 0 }}>
                                    <label className="label">Numéro de lot</label>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="LOT-XXXX"
                                        value={batchNumber}
                                        onChange={(e) => setBatchNumber(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                className="btn btn-secondary w-full"
                                onClick={addEntry}
                                disabled={!selectedProduct || !quantity}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: 18, height: 18 }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                Ajouter au bon d'entrée
                            </button>
                        </div>

                        {/* Quick Add Buttons */}
                        <div>
                            <p style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)', marginBottom: 'var(--space-2)' }}>
                                Ajout rapide :
                            </p>
                            <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
                                {products.slice(0, 5).map(product => (
                                    <button
                                        key={product.id}
                                        className="btn btn-ghost btn-sm"
                                        onClick={() => setSelectedProduct(product.id)}
                                        style={{ fontSize: '0.75rem' }}
                                    >
                                        {product.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right - Summary */}
                <div>
                    <div className="card" style={{ position: 'sticky', top: 'var(--space-8)' }}>
                        {/* Header */}
                        <div style={{
                            background: 'linear-gradient(135deg, var(--success-500), var(--success-600))',
                            color: 'white',
                            padding: 'var(--space-5)',
                            borderRadius: 'var(--radius-xl)',
                            marginBottom: 'var(--space-6)',
                            textAlign: 'center'
                        }}>
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 24, height: 24 }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                </svg>
                                <span style={{ fontWeight: 600 }}>Bon d'entrée</span>
                            </div>
                            <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>{totalItems}</div>
                            <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>articles à enregistrer</div>
                        </div>

                        <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-4)' }}>
                            Produits ajoutés ({entries.length})
                        </h3>

                        {entries.length === 0 ? (
                            <div className="empty-state" style={{ padding: 'var(--space-8) 0' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" style={{ width: 48, height: 48, margin: '0 auto var(--space-4)', opacity: 0.3 }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                </svg>
                                <p style={{ color: 'var(--foreground-muted)', fontSize: '0.875rem' }}>
                                    Ajoutez des produits au bon d'entrée
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="flex flex-col gap-3" style={{ marginBottom: 'var(--space-4)' }}>
                                    {entries.map((entry, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                padding: 'var(--space-3)',
                                                background: 'var(--neutral-50)',
                                                borderRadius: 'var(--radius-lg)'
                                            }}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>{entry.productName}</div>
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)' }}>
                                                        {entry.expiryDate && `Exp: ${new Date(entry.expiryDate).toLocaleDateString('fr-FR')}`}
                                                        {entry.batchNumber && ` • Lot: ${entry.batchNumber}`}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span style={{
                                                        fontWeight: 600,
                                                        color: 'var(--success-600)',
                                                        background: 'var(--success-100)',
                                                        padding: 'var(--space-1) var(--space-2)',
                                                        borderRadius: 'var(--radius-md)',
                                                        fontSize: '0.875rem'
                                                    }}>
                                                        +{entry.quantity}
                                                    </span>
                                                    <button
                                                        className="btn btn-ghost btn-sm"
                                                        style={{ width: 28, height: 28, padding: 0 }}
                                                        onClick={() => removeEntry(index)}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="var(--error-500)" style={{ width: 14, height: 14 }}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col gap-2">
                                    <button
                                        className="btn btn-primary w-full btn-lg"
                                        disabled={entries.length === 0 || !source}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: 18, height: 18 }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>
                                        Valider l'entrée de stock
                                    </button>
                                    <button
                                        className="btn btn-ghost w-full"
                                        onClick={() => setEntries([])}
                                    >
                                        Annuler
                                    </button>
                                </div>
                            </>
                        )}

                        {/* Info */}
                        {entries.length > 0 && (
                            <div style={{
                                marginTop: 'var(--space-4)',
                                padding: 'var(--space-3)',
                                background: 'var(--secondary-50)',
                                borderRadius: 'var(--radius-lg)',
                                fontSize: '0.75rem',
                                color: 'var(--secondary-700)'
                            }}>
                                <div className="flex items-start gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 16, height: 16, flexShrink: 0, marginTop: 2 }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                    </svg>
                                    <span>L'entrée sera automatiquement tracée et le stock sera mis à jour en temps réel.</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
