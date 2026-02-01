'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface SearchResult {
    type: 'beneficiary' | 'product' | 'distribution'
    id: string
    title: string
    subtitle: string
    icon: string
    href: string
}

export default function SearchGlobal() {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<SearchResult[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    useEffect(() => {
        if (query.length < 2) {
            setResults([])
            return
        }

        const delayDebounce = setTimeout(async () => {
            setIsLoading(true)
            try {
                const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
                const data = await response.json()
                setResults(data.results || [])
            } catch (error) {
                console.error('Search error:', error)
            } finally {
                setIsLoading(false)
            }
        }, 300)

        return () => clearTimeout(delayDebounce)
    }, [query])

    const handleSelect = (result: SearchResult) => {
        setQuery('')
        setIsOpen(false)
        router.push(result.href)
    }

    return (
        <div style={{ position: 'relative', width: '100%', maxWidth: 400 }}>
            <div style={{ position: 'relative' }}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    style={{
                        position: 'absolute',
                        left: 12,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 18,
                        height: 18,
                        color: 'var(--foreground-muted)'
                    }}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input
                    ref={inputRef}
                    type="text"
                    className="input"
                    placeholder="Rechercher bénéficiaires, produits..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value)
                        setIsOpen(true)
                    }}
                    onFocus={() => setIsOpen(true)}
                    onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                    style={{ paddingLeft: 40, height: 40 }}
                />
                {isLoading && (
                    <div style={{
                        position: 'absolute',
                        right: 12,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: '0.875rem'
                    }}>
                        ⏳
                    </div>
                )}
            </div>

            {/* Results Dropdown */}
            {isOpen && results.length > 0 && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    marginTop: 4,
                    background: 'var(--surface)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-lg)',
                    border: '1px solid var(--neutral-200)',
                    maxHeight: 300,
                    overflow: 'auto',
                    zIndex: 100
                }}>
                    {results.map((result) => (
                        <div
                            key={`${result.type}-${result.id}`}
                            onClick={() => handleSelect(result)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--space-3)',
                                padding: 'var(--space-3) var(--space-4)',
                                cursor: 'pointer',
                                borderBottom: '1px solid var(--neutral-100)'
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--neutral-50)')}
                            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                        >
                            <span style={{ fontSize: '1.25rem' }}>{result.icon}</span>
                            <div>
                                <div style={{ fontWeight: 500 }}>{result.title}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--foreground-muted)' }}>
                                    {result.subtitle}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isOpen && query.length >= 2 && results.length === 0 && !isLoading && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    marginTop: 4,
                    background: 'var(--surface)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-lg)',
                    border: '1px solid var(--neutral-200)',
                    padding: 'var(--space-4)',
                    textAlign: 'center',
                    color: 'var(--foreground-muted)',
                    zIndex: 100
                }}>
                    Aucun résultat trouvé
                </div>
            )}
        </div>
    )
}
