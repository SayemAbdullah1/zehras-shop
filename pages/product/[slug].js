import Layout from "@/components/Layout";
import data from "@/utilities/data";
import { Store } from "@/utilities/store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";


export default function ProductScreen() {
    const router = useRouter();
    const {state, dispatch} = useContext(Store)
    const { query } = useRouter();
    const { slug } = query;
    const product = data?.products.find((x) => x.slug === slug)
    if (!product) {
        return <div>Product not found</div>
    }

    const handleAddToCart = ()=>{
        const existItem = state.cart.cartItems.find((x) => x.slug === product.slug)
        const quantity = existItem ? existItem.quantity + 1 : 1;

        if(product.countInStock < quantity){
            alert('Sorry! product is not in stock')
            return 
        }

        dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity }});
        router.push('/cart')
    };

    return (
        <Layout title={product?.name}>
            <div className="py-2">
                <Link href="/">back to products</Link>
                <div className="grid md:grid-cols-4 md:gap-3">
                    <div className="md:col-span-2">
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={640}
                            height={540}
                            
                        ></Image>
                    </div>
                    <div>
                        <ul>
                            <li>
                                <h1 className="text-lg font-bold">{product.name}</h1>
                            </li>
                            <li>Category: {product.category}</li>
                            <li>
                                {product.rating} of {product.numreviews} reviews
                            </li>
                            <li> {product.description}</li>
                        </ul>
                    </div>
                    <div>
                        <div className="card p-5">
                            <div className="mb-2 flex justify-between">

                            <div>Price</div>
                            <div>${product.price}</div>
                            </div>
                        <div className=" mb-2 flex justify-between">
                            <div>Status</div>
                            <div>{product.countInStock > 0 ? 'In stock': 'Unavalable'}</div>
                        </div>
                        <button className="primary-button w-full" onClick={handleAddToCart}>Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )

}
