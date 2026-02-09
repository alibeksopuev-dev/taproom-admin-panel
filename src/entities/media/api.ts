import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface UploadMediaParams {
    file: File
    bucket?: string
}

export interface UploadMediaResponse {
    path: string
    publicUrl: string
}

/**
 * Upload a file to Supabase Storage
 */
export async function uploadMedia({
    file,
    bucket = 'menu-images',
}: UploadMediaParams): Promise<UploadMediaResponse> {
    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = fileName

    // Upload file
    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
        })

    if (error) {
        throw new Error(`Upload failed: ${error.message}`)
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path)

    return {
        path: data.path,
        publicUrl,
    }
}

/**
 * Delete a file from Supabase Storage
 */
export async function deleteMedia(path: string, bucket = 'menu-images'): Promise<void> {
    const { error } = await supabase.storage.from(bucket).remove([path])

    if (error) {
        throw new Error(`Delete failed: ${error.message}`)
    }
}
