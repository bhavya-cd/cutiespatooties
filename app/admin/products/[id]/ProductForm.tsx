'use client'

import Link from 'next/link'
import { useState } from 'react'
import { saveProduct } from '../../actions'

interface ProductFormProps {
    product?: any
    isNew: boolean
    params: { id: string }
}

export default function ProductForm({ product, isNew, params }: ProductFormProps) {
    const [formData, setFormData] = useState({
        title: product?.title || '',
        slug: product?.slug || '',
        price: product?.price || '',
        brand: product?.brand || '',
        shortDescription: product?.short_description || '',
        description: product?.description || '',
        sizes: product?.sizes?.join(', ') || '',
        availableSizes: product?.available_sizes?.join(', ') || '',
        images: product?.images?.join(', ') || '',
        whatsappMessage: product?.whatsapp_message || '',
    })

    const [imagePreview, setImagePreview] = useState<string[]>(product?.images || [])

    const handleInputChange = (e: any) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleImageFileChange = (e: any) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(prev => [reader.result as string, ...prev])
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <form action={saveProduct} encType="multipart/form-data" className="space-y-8">
            <input type="hidden" name="id" value={params.id} />

            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    📋 Basic Information
                </h2>
                <div className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Product Title *</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                            placeholder="e.g., Elegant Blue Denim Jacket"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">URL Slug *</label>
                            <input
                                type="text"
                                name="slug"
                                id="slug"
                                value={formData.slug}
                                onChange={handleInputChange}
                                required
                                placeholder="e.g., blue-denim-jacket"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                            <input
                                type="text"
                                name="brand"
                                id="brand"
                                value={formData.brand}
                                onChange={handleInputChange}
                                placeholder="e.g., Cuties Fashion"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
                            <div className="relative">
                                <span className="absolute left-4 top-2 text-gray-600">₹</span>
                                <input
                                    type="text"
                                    name="price"
                                    id="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="0.00"
                                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
                            <input
                                type="text"
                                name="shortDescription"
                                id="shortDescription"
                                value={formData.shortDescription}
                                onChange={handleInputChange}
                                placeholder="Brief product description"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Full Description</label>
                        <textarea
                            name="description"
                            id="description"
                            rows={4}
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Detailed product description, materials, care instructions..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-vertical"
                        />
                    </div>
                </div>
            </div>

            {/* Images */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    🖼️ Product Images
                </h2>
                <div className="space-y-6">
                    <div>
                        <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700 mb-2">Upload New Image</label>
                        <input
                            type="file"
                            name="imageFile"
                            id="imageFile"
                            accept="image/*"
                            onChange={handleImageFileChange}
                            className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700"
                        />
                        <p className="text-xs text-gray-500 mt-2">JPG, PNG, WebP up to 10MB</p>
                    </div>

                    <div>
                        <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-2">Image URLs (comma separated)</label>
                        <textarea
                            name="images"
                            id="images"
                            rows={2}
                            value={formData.images}
                            onChange={handleInputChange}
                            placeholder="e.g., https://example.com/image1.jpg, https://example.com/image2.jpg"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>

                    {imagePreview.length > 0 && (
                        <div>
                            <p className="text-sm font-medium text-gray-700 mb-3">Image Preview</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {imagePreview.map((img, idx) => (
                                    <div key={idx} className="relative">
                                        <img
                                            src={img}
                                            alt={`Preview ${idx}`}
                                            className="w-full h-32 object-cover rounded-lg"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Sizes & Inventory */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    📏 Sizes & Inventory
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="sizes" className="block text-sm font-medium text-gray-700 mb-2">All Available Sizes</label>
                        <input
                            type="text"
                            name="sizes"
                            id="sizes"
                            value={formData.sizes}
                            onChange={handleInputChange}
                            placeholder="e.g., XS, S, M, L, XL, XXL"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        <p className="text-xs text-gray-500 mt-2">Comma separated list of all sizes</p>
                    </div>
                    <div>
                        <label htmlFor="availableSizes" className="block text-sm font-medium text-gray-700 mb-2">Currently Available Sizes</label>
                        <input
                            type="text"
                            name="availableSizes"
                            id="availableSizes"
                            value={formData.availableSizes}
                            onChange={handleInputChange}
                            placeholder="e.g., S, M, L"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        <p className="text-xs text-gray-500 mt-2">Subset of available sizes in stock</p>
                    </div>
                </div>
            </div>

            {/* WhatsApp Integration */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    💬 WhatsApp Integration
                </h2>
                <div>
                    <label htmlFor="whatsappMessage" className="block text-sm font-medium text-gray-700 mb-2">Custom WhatsApp Message</label>
                    <textarea
                        name="whatsappMessage"
                        id="whatsappMessage"
                        rows={3}
                        value={formData.whatsappMessage}
                        onChange={handleInputChange}
                        placeholder="e.g., Hi! I'm interested in the Blue Denim Jacket. Please provide more details."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-2">This message will be sent when customers click WhatsApp</p>
                </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-between items-center gap-4">
                <Link
                    href="/admin"
                    className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                    Cancel
                </Link>
                <button
                    type="submit"
                    className="px-8 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
                >
                    {isNew ? '➕ Create Product' : '✅ Save Changes'}
                </button>
            </div>
        </form>
    )
}
