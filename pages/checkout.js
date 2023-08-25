import Layout from "@/components/Layout";
import { ProductsContext } from "@/components/ProductsContext";
import { useContext, useEffect, useState } from "react";

export default function CheckoutPage() {
    const {selectedProducts, setSelectedProducts} = useContext(ProductsContext);
    const [productsInfos, setProductInfos] = useState([]);
    const [address,setAddress] = useState('');
    const [city,setCity] = useState('');
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');

    useEffect(() => {
        const uniqIds = [...new Set(selectedProducts)];
        fetch('/api/products?ids='+uniqIds.join(','))
            .then(response => response.json())
            .then(json => setProductInfos(json));
    }, [selectedProducts]);

    function moreOfThisProduct(id) {
        setSelectedProducts(prev => [...prev,id]);
    }
    
    function lessOfThisProduct(id) {
        const pos = selectedProducts.indexOf(id);
        if (pos !== -1) {
            setSelectedProducts(prev => {
                return prev.filter((value,index) => index !== pos);
            });
        }
    }

    const deliveryPrice = 30000;
    let subtotal = 0;
    if (selectedProducts?.length) {
        for (let id of selectedProducts) {
            const price = Number(productsInfos.find(p => p._id === id)?.price || 0);
            subtotal += price;
        }
    }

    const total = subtotal + deliveryPrice;

    return (
        <Layout>
            {!productsInfos.length && (
                <div>no products in you shopping cart</div>
            )}
            {productsInfos.length && productsInfos.map(productInfo => {
                const amount = selectedProducts.filter(id => id === productInfo._id).length;
                if (amount === 0) return;
                return (
                    <div className="flex mb-5" key={productInfo._id}>
                        <div className="bg-gray-100 p-3 rounded-xl shrink-0">
                            <img className="w-24" src={productInfo.picture} alt=""/>
                        </div>
                        <div className="pl-4">
                            <h3 className="font-bold text-lg">{productInfo.name}</h3>
                            <p className="text-sm leading-4 text-gray-400">{productInfo.description}</p>
                            <div className="flex">
                                <div className="grow">Rp. {Number(productInfo.price).toLocaleString('id-ID')}</div>
                                <div>
                                    <button onClick={() => lessOfThisProduct(productInfo._id)} className="border border-emerald-600 px-2 rounded-lg text-emerald-600">-</button>
                                    <span className="px-3 text-white">
                                    {amount}
                                    </span>
                                    <button onClick={() => moreOfThisProduct(productInfo._id)} className="bg-emerald-600 px-2 rounded-lg text-white">+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )})}
            <form action="/api/checkout" method="POST">
                <div className="mt-4">
                    <input name="address" value={address} onChange={e => setAddress(e.target.value)} className="bg-gray-800 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="Street address, number"></input>
                    <input name="city" value={city} onChange={e => setCity(e.target.value)} className="bg-gray-800 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="City and postal code"></input>
                    <input name="name" value={name} onChange={e => setName(e.target.value)} className="bg-gray-800 w-full rounded-lg px-4 py-2 mb-2" type="text" placeholder="Your name"></input>
                    <input name="email" value={email} onChange={e => setEmail(e.target.value)} className="bg-gray-800 w-full rounded-lg px-4 py-2 mb-2" type="email" placeholder="Email address"></input>
                </div>
                <div className="mt-4">
                    <div className="flex font-bold">
                        <h3 className="grow font-bold text-gray-100">Subtotal:</h3>
                        <h3>Rp. {Number(subtotal).toLocaleString('id-ID')}</h3>
                    </div>
                    <div className="flex font-bold">
                        <h3 className="grow font-bold text-gray-100">Delivery:</h3>
                        <h3>Rp. {Number(deliveryPrice).toLocaleString('id-ID')}</h3>
                    </div>
                    <div className="flex font-bold my-2 pt-2 border-t border-gray-500">
                        <h3 className="grow font-bold text-gray-100">Total:</h3>
                        <h3>Rp. {Number(total).toLocaleString('id-ID')}</h3>
                    </div>
                </div>
                <input type="hidden" name="products" value={selectedProducts.join(',')}></input>
                <button type="submit" className="bg-emerald-500 py-2 rounded-xl font-bold w-full my-4 shadow-emerald-800 shadow-xl">Pay Rp. {Number(total).toLocaleString('id-ID')}</button>
            </form>
        </Layout>
    );
}