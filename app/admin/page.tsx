import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { logout } from './actions'
import DeleteButton from './DeleteButton'

export default async function AdminDashboard() {
    const supabase = createClient()

    const { data: products } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header/Navigation */}
            <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">CA</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">Cuties Admin</h1>
                                <p className="text-xs text-gray-500">Dashboard</p>
                            </div>
                        </div>
                        <div className="flex gap-3 items-center">
                            <Link
                                href="/admin/products/new"
                                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors flex items-center gap-2"
                            >
                                <span>➕</span>
                                Add Product
                            </Link>
                            <form action={logout}>
                                <button
                                    type="submit"
                                    className="rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-300 transition-colors"
                                >
                                    Logout
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="mx-auto max-w-7xl py-8 px-4 sm:px-6 lg:px-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-indigo-600">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Total Products</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{products?.length || 0}</p>
                            </div>
                            <div className="text-4xl opacity-20">📦</div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-600">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Active Listings</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{products?.length || 0}</p>
                            </div>
                            <div className="text-4xl opacity-20">✅</div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-600">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Last Updated</p>
                                <p className="text-lg font-bold text-gray-900 mt-2">
                                    {products && products.length > 0 && products[0].created_at
                                        ? new Date(products[0].created_at).toLocaleDateString()
                                        : 'N/A'
                                    }
                                </p>
                            </div>
                            <div className="text-4xl opacity-20">📅</div>
                        </div>
                    </div>
                </div>

                {/* Products Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    {!products || products.length === 0 ? (
                        <div className="p-12 text-center">
                            <p className="text-gray-500 text-lg">
                                No products yet. Create your first product!
                            </p>
                            <Link
                                href="/admin/products/new"
                                className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 font-semibold"
                            >
                                Create First Product →
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Product</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Brand</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Price</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Created</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {products.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 flex items-center gap-3">
                                                {product.images?.[0] && (
                                                    <img
                                                        src={product.images[0]}
                                                        alt={product.title}
                                                        className="h-12 w-12 rounded-md object-cover shadow-sm"
                                                    />
                                                )}
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{product.title}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {product.brand || '—'}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                                {product.price}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {new Date(product.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right flex justify-end gap-2">
                                                <Link
                                                    href={`/admin/products/${product.id}`}
                                                    className="text-indigo-600 hover:text-indigo-900 font-medium text-sm bg-indigo-50 px-3 py-1 rounded transition-colors hover:bg-indigo-100"
                                                >
                                                    Edit
                                                </Link>
                                                <DeleteButton id={product.id} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
