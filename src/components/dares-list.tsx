'use client'

import { useEffect, useState } from 'react'
import { Dare } from '@/types/dare'
import { fetchDares } from '@/lib/api/dares'
import { DareCard } from './dares/dare-card'

export function DaresList() {
  const [dares, setDares] = useState<Dare[]>([])

  useEffect(() => {
    const loadDares = async () => {
      const data = await fetchDares();
      setDares(data);
    };
    loadDares();
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {dares.map((dare) => (
        <DareCard key={dare.id} dare={dare} />
      ))}
    </div>
  )
}