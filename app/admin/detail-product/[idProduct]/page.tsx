export default async function Page({
    params,
}: {
    params: Promise<{ idProduct: string }>
}) {
    const { idProduct } = await params
    return <div>My Post: {idProduct}</div>
}
