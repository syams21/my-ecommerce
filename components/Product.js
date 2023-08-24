import { useContext } from "react";
import { ProductsContext } from "./ProductsContext";

export default function Product({_id, name, price, description, picture}) {
    const {setSelectedProducts} = useContext(ProductsContext);
    function addProduct() {
        setSelectedProducts(prev => [...prev, _id]);
    }
    return (
        <div className="w-96">
            <div className="bg-gray-900 rounded-xl">
              <img src={picture} alt=""></img>
            </div>
            <div className="mt-2">
              <h3 className="font-bold text-lg">{name}</h3>
            </div>
            <p className="text-sm mt-2 leading-5">{description}</p>
            <div className="flex mt-2">
              <div className="text-xl font-bold grow">Rp. {price}</div>
              <button onClick={addProduct} className="bg-emerald-400 py-1 px-3 rounded-md">add to cart</button>
            </div>
          </div>
    );
}