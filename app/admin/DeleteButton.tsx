'use client'

import { deleteProduct } from '@/app/admin/actions'

export default function DeleteButton({ id }: { id: string }) {
    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(id)
        }
    }

    return (
        <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-900 text-sm font-medium"
        >
            Delete
        </button>
    )
}
