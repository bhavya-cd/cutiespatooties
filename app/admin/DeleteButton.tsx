'use client'

import { deleteProduct } from '@/app/admin/actions'
import { useState } from 'react'

interface DeleteButtonProps {
    id: string
    onDelete?: (id: string) => void
}

export default function DeleteButton({ id, onDelete }: DeleteButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        if (confirm('⚠️ Are you sure you want to delete this product? This action cannot be undone.')) {
            setIsDeleting(true)
            try {
                await deleteProduct(id)
                onDelete?.(id)
            } finally {
                setIsDeleting(false)
            }
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-900 font-medium text-sm bg-red-50 px-3 py-1 rounded transition-colors hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
        >
            {isDeleting ? '⏳ Deleting...' : '🗑️ Delete'}
        </button>
    )
}
