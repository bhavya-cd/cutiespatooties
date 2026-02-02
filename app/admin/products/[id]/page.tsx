import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import { saveProduct } from '../../actions'

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
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                            {isNew ? 'Add New Product' : 'Edit Product'}
                        </h3>
                        <form action={saveProduct} className="mt-5 space-y-6" encType="multipart/form-data">
                            <input type="hidden" name="id" value={params.id} />

                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    defaultValue={product?.title}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="slug" className="block text-sm font-medium text-gray-700">Slug</label>
                                <input
                                    type="text"
                                    name="slug"
                                    id="slug"
                                    defaultValue={product?.slug}
                                    required
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                                    <input
                                        type="text"
                                        name="price"
                                        id="price"
                                        defaultValue={product?.price}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
                                    <input
                                        type="text"
                                        name="brand"
                                        id="brand"
                                        defaultValue={product?.brand}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700">Short Description</label>
                                <input
                                    type="text"
                                    name="shortDescription"
                                    id="shortDescription"
                                    defaultValue={product?.short_description}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    id="description"
                                    rows={4}
                                    defaultValue={product?.description}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700">Upload New Image</label>
                                    <input
                                        type="file"
                                        name="imageFile"
                                        id="imageFile"
                                        accept="image/*"
                                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="images" className="block text-sm font-medium text-gray-700">Or Image URLs (comma separated)</label>
                                    <input
                                        type="text"
                                        name="images"
                                        id="images"
                                        defaultValue={product?.images?.join(', ')}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="sizes" className="block text-sm font-medium text-gray-700">All Sizes (comma separated)</label>
                                    <input
                                        type="text"
                                        name="sizes"
                                        id="sizes"
                                        defaultValue={product?.sizes?.join(', ')}
                                        placeholder="S, M, L, XL"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="availableSizes" className="block text-sm font-medium text-gray-700">Available Sizes</label>
                                    <input
                                        type="text"
                                        name="availableSizes"
                                        id="availableSizes"
                                        defaultValue={product?.available_sizes?.join(', ')}
                                        placeholder="e.g., S, M, L"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="whatsappMessage" className="block text-sm font-medium text-gray-700">WhatsApp Message</label>
                                <input
                                    type="text"
                                    name="whatsappMessage"
                                    id="whatsappMessage"
                                    defaultValue={product?.whatsapp_message}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>

                            <div className="flex justify-end gap-3">
                                <Link
                                    href="/admin"
                                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Save Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
