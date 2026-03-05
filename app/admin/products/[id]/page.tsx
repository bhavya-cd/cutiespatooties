import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import { saveProduct } from '../../actions'
import ProductForm from './ProductForm'

export default async function EditProductPage({
    params,
}: {
    params: { id: string }
}) {
    const isNew = params.id === 'new'
    let product = null

    if (!isNew) {
        const supabase = createClient()
        const { data } = await supabase
            .from('products')
            .select('*')
            .eq('id', params.id)
            .single()

        if (!data) notFound()
        product = data
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/admin" className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold mb-4 inline-block">
                        ← Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">
                        {isNew ? '➕ Add New Product' : '✏️ Edit Product'}
                    </h1>
                    <p className="text-gray-600 mt-2">
                        {isNew ? 'Create a new product and add it to your catalog' : 'Update product details and manage inventory'}
                    </p>
                </div>

                <ProductForm product={product} isNew={isNew} params={params} />
            </div>
        </div>
    )
}

export async function generateMetadata({ params }: { params: { id: string } }) {
    return {
        title: params.id === 'new' ? 'Add Product' : 'Edit Product',
    }
}
