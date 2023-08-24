import Product from "@/components/Product";
import { useEffect, useState } from "react";

export default function Home() {
  const [productsInfo, setProductsInfo] = useState([]);
  const [phrase, setPhrase] = useState('');
  useEffect(() => {
    fetch('/api/products')
    .then(response => response.json())
    .then(json => setProductsInfo(json));
  }, []);

  const categoriesName = [...new Set(productsInfo.map(p => p.category))];
  console.log({categoriesName});

  let products;
  if (phrase) {
    products = productsInfo.filter(p => p.name.toLowerCase().includes(phrase));
  } else {
    products = productsInfo;
  }

  return (
    <div className="p-5">
      <input value={phrase} onChange={e => setPhrase(e.target.value)} type="text" placeholder="Search for products..." className="w-full py-2 px-4 rounded-3xl text-black"></input>
      <div>
        {categoriesName.map(categoriesName => (
          <div key={categoriesName}>
            <h2 className="text-2xl py-5 capitalize">{categoriesName}</h2>
              <div className="flex -mx-5 overflow-x-scroll scrollbar-hide">
                {products.filter(p => p.category === categoriesName).map(productsInfo => (
                  <div key={productsInfo._id} className="px-5 snap-start">
                    <Product {...productsInfo}></Product>
                  </div>
                ))}
              </div>
          </div>
        ))}
        <div className="pw-4">
          
        </div>
      </div>
    </div>
  )
}
