import Product from "@/components/Product";
import { initMongoose } from "@/lib/mongoose";
import { useEffect, useState } from "react";
import { findAllProducts } from "./api/products";
import Footer from "@/components/Footer";
import Layout from "@/components/Layout";

export default function Home({products}) {
  const [phrase, setPhrase] = useState('');

  const categoriesName = [...new Set(products.map(p => p.category))];

  if (phrase) {
    products = products.filter(p => p.name.toLowerCase().includes(phrase));
  }

  return (
    <Layout>
      <input value={phrase} onChange={e => setPhrase(e.target.value)} type="text" placeholder="Search for products..." className="w-full py-2 px-4 rounded-3xl text-black"></input>
      <div>
        {categoriesName.map(categoriesName => (
          <div key={categoriesName}>
            {products.find(p => p.category === categoriesName) && (
              <div>
                <h2 className="text-2xl py-5 capitalize">{categoriesName}</h2>
                  <div className="flex -mx-5 overflow-x-scroll scrollbar-hide">
                    {products.filter(p => p.category === categoriesName).map(productsInfo => (
                      <div key={productsInfo._id} className="px-5 snap-start">
                        <Product {...productsInfo}></Product>
                      </div>
                    ))}
                  </div>
              </div>
            )}
          </div>
        ))}
      </div>

    </Layout>
  )
}

export async function getServerSideProps() {
  await initMongoose();
  const products = await findAllProducts();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
