'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function NewDistributionPage() {
    const [selectedBeneficiary, setSelectedBeneficiary] = useState<string | null>(null)
    const [cart, setCart] = useState<{ id: string; name: string; quantity: number; points: number }[]>([])

    const beneficiaries = [
        { id: '1', name: 'Marie Lambert', points: 45, lastVisit: '2026-01-23' },
        { id: '2', name: 'Pierre Dubois', points: 32, lastVisit: '2026-01-25' },
        { id: '3', name: 'Sophie Martin', points: 58, lastVisit: '2026-01-20' },
        { id: '4', name: 'Ahmed Rahmani', points: 40, lastVisit: '2026-01-28' },
    ]

    const products = [
        { id: '1', name: 'Pâtes (500g)', category: 'Épicerie', points: 3, stock: 150 },
        { id: '2', name: 'Riz (1kg)', category: 'Épicerie', points: 4, stock: 80 },
        { id: '3', name: 'Lait UHT (1L)', category: 'Produits laitiers', points: 2, stock: 25 },
        { id: '4', name: 'Huile (1L)', category: 'Épicerie', points: 5, stock: 45 },
        { id: '5', name: 'Sucre (1kg)', category: 'Épicerie', points: 3, stock: 60 },
        { id: '6', name: 'Farine (1kg)', category: 'Épicerie', points: 2, stock: 35 },
        { id: '7', name: 'Conserve légumes', category: 'Conserves', points: 2, stock: 12 },
        { id: '8', name: 'Café (250g)', category: 'Boissons', points: 6, stock: 20 },
    ]

    const selectedBeneficiaryData = beneficiaries.find(b => b.id === selectedBeneficiary)
    const totalPoints = cart.reduce((sum, item) => sum + (item.points * item.quantity), 0)
    const remainingPoints = selectedBeneficiaryData ? selectedBeneficiaryData.points - totalPoints : 0

    const addToCart = (product: typeof products[0]) => {
        const existing = cart.find(item => item.id === product.id)
        if (existing) {
            setCart(cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ))
        } else {
            setCart([...cart, { id: product.id, name: product.name, quantity: 1, points: product.points }])
        }
    }

    const removeFromCart = (productId: string) => {
        const existing = cart.find(item => item.id === productId)
        if (existing && existing.quantity > 1) {
            setCart(cart.map(item =>
                item.id === productId
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            ))
        } else {
            setCart(cart.filter(item => item.id !== productId))
        }
    }

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('')
    }

    return (
        <div className="animate-fade-in">
            {/* Page Header */}
            <div className="page-header">
                <div className="flex items-center gap-4 mb-4">
                    <Link href="/distributions" className="btn btn-ghost btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: 18, height: 18 }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                        Retour
                    </Link>
                </div>
                <h1 className="page-title">Nouvelle Distribution</h1>
                <p className="page-description">Enregistrer une distribution pour un bénéficiaire</p>
            </div>

            <div className="grid" style={{ gridTemplateColumns: '1fr 380px', gap: 'var(--space-6)' }}>
                {/* Left Side - Selection */}
                <div>
                    {/* Step 1: Select Beneficiary */}
                    <div className="card mb-6">
                        <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 'var(--space-4)' }}>
                            1. Sélectionner le bénéficiaire
                        </h2>

                        <div className="form-group" style={{ marginBottom: 'var(--space-4)' }}>
                            <input
                                type="text"
                                className="input"
                                placeholder="Rechercher par nom ou numéro de dossier..."
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            {beneficiaries.map(beneficiary => (
                                <button
                                    key={beneficiary.id}
                                    onClick={() => setSelectedBeneficiary(beneficiary.id)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: 'var(--space-4)',
                                        background: selectedBeneficiary === beneficiary.id
                                            ? 'var(--primary-50)'
                                            : 'var(--neutral-50)',
                                        border: selectedBeneficiary === beneficiary.id
                                            ? '2px solid var(--primary-500)'
                                            : '2px solid transparent',
                                        borderRadius: 'var(--radius-lg)',
                                        cursor: 'pointer',
                                        transition: 'all var(--transition-fast)',
                                        textAlign: 'left'
                                    }}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="avatar avatar-sm">{getInitials(beneficiary.name)}</div>
                                        <div>
                                            <div style={{ fontWeight: 500 }}>{beneficiary.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)' }}>
                                                Dernière visite: {new Date(beneficiary.lastVisit).toLocaleDateString('fr-FR')}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontWeight: 600, color: 'var(--primary-600)' }}>{beneficiary.points} pts</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)' }}>disponibles</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Step 2: Select Products */}
                    {selectedBeneficiary && (
                        <div className="card animate-fade-in">
                            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: 'var(--space-4)' }}>
                                2. Sélectionner les produits
                            </h2>

                            {/* Categories filter */}
                            <div className="flex gap-2 mb-4" style={{ flexWrap: 'wrap' }}>
                                <button className="btn btn-primary btn-sm">Tout</button>
                                <button className="btn btn-ghost btn-sm">Épicerie</button>
                                <button className="btn btn-ghost btn-sm">Produits laitiers</button>
                                <button className="btn btn-ghost btn-sm">Conserves</button>
                                <button className="btn btn-ghost btn-sm">Boissons</button>
                            </div>

                            {/* Products Grid */}
                            <div className="grid grid-cols-2 gap-3">
                                {products.map(product => {
                                    const cartItem = cart.find(item => item.id === product.id)
                                    const isLowStock = product.stock < 20
                                    const canAdd = remainingPoints >= product.points

                                    return (
                                        <div
                                            key={product.id}
                                            style={{
                                                padding: 'var(--space-4)',
                                                background: 'var(--neutral-50)',
                                                borderRadius: 'var(--radius-lg)',
                                                opacity: canAdd || cartItem ? 1 : 0.5
                                            }}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>{product.name}</div>
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)' }}>
                                                        {product.category}
                                                    </div>
                                                </div>
                                                <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>
                                                    {product.points} pts
                                                </span>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <span style={{
                                                    fontSize: '0.75rem',
                                                    color: isLowStock ? 'var(--warning-600)' : 'var(--foreground-muted)'
                                                }}>
                                                    Stock: {product.stock}
                                                </span>

                                                {cartItem ? (
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            className="btn btn-secondary btn-sm"
                                                            style={{ width: 28, height: 28, padding: 0 }}
                                                            onClick={() => removeFromCart(product.id)}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: 14, height: 14 }}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                                            </svg>
                                                        </button>
                                                        <span style={{ fontWeight: 600, minWidth: 20, textAlign: 'center' }}>
                                                            {cartItem.quantity}
                                                        </span>
                                                        <button
                                                            className="btn btn-primary btn-sm"
                                                            style={{ width: 28, height: 28, padding: 0 }}
                                                            onClick={() => canAdd && addToCart(product)}
                                                            disabled={!canAdd}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: 14, height: 14 }}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        className="btn btn-secondary btn-sm"
                                                        onClick={() => addToCart(product)}
                                                        disabled={!canAdd}
                                                    >
                                                        Ajouter
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Side - Cart / Summary */}
                <div>
                    <div className="card" style={{
                        position: 'sticky',
                        top: 'var(--space-8)',
                        background: 'var(--surface)'
                    }}>
                        {/* Points Summary */}
                        {selectedBeneficiaryData && (
                            <div style={{
                                background: totalPoints > selectedBeneficiaryData.points
                                    ? 'var(--error-50)'
                                    : 'linear-gradient(135deg, var(--primary-500), var(--primary-600))',
                                color: totalPoints > selectedBeneficiaryData.points ? 'var(--error-700)' : 'white',
                                padding: 'var(--space-5)',
                                borderRadius: 'var(--radius-xl)',
                                marginBottom: 'var(--space-6)',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: 'var(--space-1)' }}>
                                    Points restants
                                </div>
                                <div style={{ fontSize: '2.5rem', fontWeight: 700 }}>{remainingPoints}</div>
                                <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                                    sur {selectedBeneficiaryData.points} disponibles
                                </div>
                            </div>
                        )}

                        <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-4)' }}>
                            Panier ({cart.length} articles)
                        </h3>

                        {cart.length === 0 ? (
                            <div className="empty-state" style={{ padding: 'var(--space-8) 0' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" style={{ width: 48, height: 48, margin: '0 auto var(--space-4)', opacity: 0.3 }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                                <p style={{ color: 'var(--foreground-muted)', fontSize: '0.875rem' }}>
                                    Sélectionnez des produits à distribuer
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="flex flex-col gap-3" style={{ marginBottom: 'var(--space-4)' }}>
                                    {cart.map(item => (
                                        <div
                                            key={item.id}
                                            className="flex justify-between items-center"
                                            style={{
                                                padding: 'var(--space-3)',
                                                background: 'var(--neutral-50)',
                                                borderRadius: 'var(--radius-lg)'
                                            }}
                                        >
                                            <div>
                                                <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>{item.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)' }}>
                                                    {item.points} pts × {item.quantity}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span style={{ fontWeight: 600, color: 'var(--primary-600)' }}>
                                                    {item.points * item.quantity} pts
                                                </span>
                                                <button
                                                    className="btn btn-ghost btn-sm"
                                                    style={{ width: 28, height: 28, padding: 0 }}
                                                    onClick={() => setCart(cart.filter(c => c.id !== item.id))}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="var(--error-500)" style={{ width: 14, height: 14 }}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Total */}
                                <div style={{
                                    padding: 'var(--space-4)',
                                    borderTop: '1px solid var(--neutral-200)',
                                    marginBottom: 'var(--space-4)'
                                }}>
                                    <div className="flex justify-between items-center">
                                        <span style={{ fontWeight: 600 }}>Total</span>
                                        <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary-600)' }}>
                                            {totalPoints} points
                                        </span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col gap-2">
                                    <button
                                        className="btn btn-primary w-full"
                                        disabled={!selectedBeneficiary || cart.length === 0 || totalPoints > (selectedBeneficiaryData?.points || 0)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" style={{ width: 18, height: 18 }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>
                                        Valider la distribution
                                    </button>
                                    <button
                                        className="btn btn-ghost w-full"
                                        onClick={() => setCart([])}
                                    >
                                        Vider le panier
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
