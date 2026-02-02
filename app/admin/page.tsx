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
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        <h1 className="text-xl font-bold text-gray-900">Cuties Admin</h1>
                        <div className="flex gap-4">
                            <Link
                                href="/admin/products/new"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                            >
                                Add Product
                            </Link>
                            <form action={logout}>
                                <button
                                    type="submit"
                                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                    Logout
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="mx-auto max-w-7xl py-10 px-4 sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow sm:rounded-md">
                    <ul role="list" className="divide-y divide-gray-200">
                        {products?.map((product) => (
                            <li key={product.id} className="px-6 py-4 flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="h-12 w-12 flex-shrink-0 bg-gray-200 rounded overflow-hidden">
                                        {product.images?.[0] && (
                                            <img src={product.images[0]} alt="" className="h-full w-full object-cover" />
                                        )}
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-indigo-600">{product.title}</p>
                                        <p className="text-sm text-gray-500">{product.price}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Link
                                        href={`/admin/products/${product.id}`}
                                        className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                                    >
                                        Edit
                                    </Link>
                                    <DeleteButton id={product.id} />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    )
}
