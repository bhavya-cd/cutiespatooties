import { products } from './products'
import { supabase } from './supabase'

export async function migrateData() {
    console.log('Starting migration...')

    for (const product of products) {
        const { data: insertedProduct, error: productError } = await supabase
            .from('products')
            .upsert({
                slug: product.slug,
                brand: product.brand,
                title: product.title,
                short_description: product.shortDescription,
                description: product.description,
                price: product.price,
                original_price: product.originalPrice,
                discount: product.discount,
                rating: product.rating,
                rating_count: product.ratingCount,
                sizes: product.sizes,
                available_sizes: product.availableSizes,
                images: product.images,
                whatsapp_message: product.whatsappMessage,
            }, { onConflict: 'slug' })
            .select()
            .single()

        if (productError) {
            console.error(`Error migrating product ${product.slug}:`, productError.message)
            continue
        }

        console.log(`Migrated product: ${product.slug}`)

        if (product.colors && product.colors.length > 0) {
            const colorsToInsert = product.colors.map(color => ({
                product_id: insertedProduct.id,
                name: color.name,
                image: color.image,
                slug: color.slug
            }))

            const { error: colorsError } = await supabase
                .from('product_colors')
                .upsert(colorsToInsert, { onConflict: 'product_id, name' }) // Note: Needs unique constraint in DB for this to work perfectly or just insert

            if (colorsError) {
                console.error(`Error migrating colors for ${product.slug}:`, colorsError.message)
            } else {
                console.log(`Migrated ${product.colors.length} colors for ${product.slug}`)
            }
        }
    }

    console.log('Migration complete!')
}
