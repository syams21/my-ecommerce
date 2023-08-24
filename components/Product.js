export default function Product({name, price, description, picture}) {
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
              <button className="bg-emerald-400 py-1 px-3 rounded-md">add to chart</button>
            </div>
          </div>
    );
}