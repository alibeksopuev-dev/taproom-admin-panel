export interface Organization {
    id: string
    name: string
    slug: string
    email: string | null
    phone_number: string | null
    address: string | null
    logo_url: string | null
    primary_color: string
    is_disabled: boolean
    created_at: string
    updated_at: string
}

export type CreateOrganizationRequest = Omit<Organization, 'id' | 'created_at' | 'updated_at'> & {
    id?: string // Optional user ID to attach organization to
}

export interface OrganizationFilters {
    name?: string
    is_disabled?: boolean
}

export interface OrganizationsResponse {
    items: Organization[]
    count: number
}
