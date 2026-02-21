import ShopCategory from "@/components/shop/ShopCategory";

export default async function ShopCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    return <ShopCategory slug={slug} />;
}
