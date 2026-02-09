import { createClient } from '@supabase/supabase-js';
import { CATEGORIES, PRODUCTS } from '../src/data/products';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseServiceKey = import.meta.VITE_SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const ORGANIZATION_ID = 'dbd4b576-8e6b-474f-b04e-a983b414fa5f';

/**
 * Seed Categories
 */
async function seedCategories() {
    console.log('🔄 Seeding categories...');

    const categoryData = CATEGORIES.map(cat => ({
        id: crypto.randomUUID(),
        organization_id: ORGANIZATION_ID,
        name: cat.name,
        slug: cat.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    }));

    const { data, error } = await supabase
        .from('categories')
        .upsert(categoryData, { onConflict: 'slug,organization_id' })
        .select();

    if (error) {
        console.error('❌ Error seeding categories:', error);
        throw error;
    }

    console.log(`✅ Seeded ${data?.length} categories`);
    return data || [];
}

/**
 * Seed Menu Items with Prices and Metadata
 */
async function seedMenuItems(categories: any[]) {
    console.log('🔄 Seeding menu items...');

    // Create category slug to ID map
    const categoryMap = new Map(
        categories.map(cat => [cat.slug, cat.id])
    );

    let successCount = 0;
    let errorCount = 0;

    for (const product of PRODUCTS) {
        try {
            const categoryId = categoryMap.get(product.category);

            if (!categoryId) {
                console.warn(`⚠️  Category not found for product: ${product.name}`);
                continue;
            }

            // 1. Create menu item
            const { data: menuItem, error: itemError } = await supabase
                .from('menu_items')
                .insert({
                    organization_id: ORGANIZATION_ID,
                    category_id: categoryId,
                    name: product.name,
                    description: product.description,
                    subcategory: product.subcategory || null,
                    image_url: null, // Add your image URLs if available
                    metadata: product.metadata || {},
                    is_disabled: false,
                })
                .select()
                .single();

            if (itemError) {
                console.error(`❌ Error creating menu item "${product.name}":`, itemError);
                errorCount++;
                continue;
            }

            // 2. Extract prices from metadata
            const prices: { size: string; price: number }[] = [];

            if (product.metadata?.beer) {
                const beer = product.metadata.beer;
                // Extract size033ml and size050ml
                if (beer.size033ml) {
                    prices.push({ size: '0.33L', price: beer.size033ml * 1000 }); // Convert to VND
                }
                if (beer.size050ml) {
                    prices.push({ size: '0.5L', price: beer.size050ml * 1000 });
                }
            }

            // Fallback: use base price if no sizes
            if (prices.length === 0 && product.price) {
                prices.push({ size: 'Standard', price: product.price * 1000 });
            }

            // 3. Create price_per_size entries
            if (prices.length > 0) {
                const priceData = prices.map(p => ({
                    menu_item_id: menuItem.id,
                    size: p.size,
                    price: p.price,
                }));

                const { error: priceError } = await supabase
                    .from('price_per_size')
                    .insert(priceData);

                if (priceError) {
                    console.error(`❌ Error creating prices for "${product.name}":`, priceError);
                }
            }

            successCount++;
            console.log(`✅ Created: ${product.name} (${prices.length} price${prices.length !== 1 ? 's' : ''})`);

        } catch (error) {
            console.error(`❌ Unexpected error for product "${product.name}":`, error);
            errorCount++;
        }
    }

    console.log(`\n📊 Summary:`);
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ❌ Errors: ${errorCount}`);
}

/**
 * Main migration function
 */
async function migrate() {
    console.log('🚀 Starting Supabase migration...\n');

    try {
        // Step 1: Seed categories
        const categories = await seedCategories();

        // Step 2: Seed menu items
        await seedMenuItems(categories);

        console.log('\n✨ Migration completed successfully!');
    } catch (error) {
        console.error('\n💥 Migration failed:', error);
        process.exit(1);
    }
}

// Run migration
migrate();
