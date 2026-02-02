import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-valentine-cream">
      <div className="text-center">
        <p className="text-valentine-rose text-6xl mb-4">♥</p>
        <h1 className="text-4xl font-serif font-semibold mb-4 text-valentine-charcoal">Product Not Found</h1>
        <p className="text-valentine-charcoal/60 mb-8">
          Sorry, we couldn&apos;t find the product you&apos;re looking for.
        </p>
        <Link
          href="/#shop"
          className="bg-valentine-burgundy text-white px-6 py-3 rounded-full inline-block font-medium hover:bg-valentine-rose transition-colors"
        >
          Back to Collection
        </Link>
      </div>
    </div>
  )
}

