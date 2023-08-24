export default function Home() {
  return (
    <div className="p-5">
      <div>
        <h2 className="text-2xl mb-4">Mobiles</h2>
        <div className="pw-4">
          <div className="w-96">
            <div className="bg-gray-900 rounded-xl">
              <img src="/products/iphone12.png" alt=""></img>
            </div>
            <div className="mt-2">
              <h3 className="font-bold text-lg">Iphone 12</h3>
            </div>
            <p className="text-sm mt-2 leading-5">Aliqua ad aliquip velit eiusmod amet incididunt magna qui non. Non duis Lorem aute sunt officia et fugiat consequat incididunt officia.</p>
            <div className="flex mt-2">
              <div className="text-xl font-bold grow">Rp 10.299.000</div>
              <button className="bg-emerald-400 py-1 px-3 rounded-md">add to chart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
