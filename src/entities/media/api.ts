import { supabase } from '@shared/api/supabase'

// 1 MB max file size
const MAX_FILE_SIZE = 1 * 1024 * 1024

export interface UploadMediaParams {
    file: File
    bucket?: string
}

export interface UploadMediaResponse {
    path: string
    publicUrl: string
}

/**
 * Upload a file to Supabase Storage.
 * Files are stored under `{userId}/{filename}` to match RLS folder policies.
 * Max file size: 1 MB.
 */
export async function uploadMedia({
    file,
    bucket = 'menu-images',
}: UploadMediaParams): Promise<UploadMediaResponse> {
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
        throw new Error(`File too large. Maximum size is 1 MB (got ${(file.size / 1024 / 1024).toFixed(1)} MB)`)
    }

    // Get current user ID for folder-based RLS
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        throw new Error('You must be logged in to upload files')
    }

    // Generate unique filename inside user's folder
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = `${user.id}/${fileName}`

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
