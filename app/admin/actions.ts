'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return redirect(`/admin/login?message=${error.message}`)
    }

    return redirect('/admin')
}

export async function saveProduct(formData: FormData) {
    const supabase = createClient()
    const id = formData.get('id') as string
    const imageFile = formData.get('imageFile') as File

    let imageUrls = (formData.get('images') as string).split(',').map(s => s.trim()).filter(Boolean)

    // Handle Image Upload if a file is provided
    if (imageFile && imageFile.size > 0) {
        const fileExt = imageFile.name.split('.').pop()
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
        const filePath = `products/${fileName}`

        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('cuties-images')
            .upload(filePath, imageFile)

        if (uploadError) {
            console.error('Image upload error:', uploadError)
        } else {
            const { data: { publicUrl } } = supabase.storage
                .from('cuties-images')
                .getPublicUrl(filePath)

            // Add the new uploaded image to the list
            imageUrls = [publicUrl, ...imageUrls]
        }
    }

    const productData = {
        title: formData.get('title') as string,
        slug: formData.get('slug') as string,
        price: formData.get('price') as string,
        description: formData.get('description') as string,
        short_description: formData.get('shortDescription') as string,
        brand: formData.get('brand') as string,
        whatsapp_message: formData.get('whatsappMessage') as string,
        images: imageUrls,
        sizes: (formData.get('sizes') as string).split(',').map(s => s.trim()).filter(Boolean),
        available_sizes: (formData.get('availableSizes') as string).split(',').map(s => s.trim()).filter(Boolean),
    }

    let error
    if (id === 'new') {
        const { error: insertError } = await supabase.from('products').insert(productData)
        error = insertError
    } else {
        const { error: updateError } = await supabase.from('products').update(productData).eq('id', id)
        error = updateError
    }

    if (error) {
        console.error('Save product error:', error)
        // Handle error...
    }

    return redirect('/admin')
}

export async function deleteProduct(id: string) {
    const supabase = createClient()
    const { error } = await supabase.from('products').delete().eq('id', id)

    if (error) {
        console.error('Delete product error:', error)
    }

    return redirect('/admin')
}

export async function logout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    return redirect('/admin/login')
}
