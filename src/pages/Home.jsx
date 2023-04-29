
import { useSelector } from "react-redux";
import { getProducts } from "../reduxSlices/productsSlice";

import Product from "../components/Product";

const Home = () => {

  const { products, isLoading } = useSelector(getProducts);


  return (
    <main className="max-w-6xl mx-auto ">
         <h1 className="text-center text-slate-900 text-4xl uppercase py-3">products</h1>
      {isLoading && 
        <div className="text-slate-900 animate-pulse text-xl text-center p-3">loading ...</div>}
      
     
      {!isLoading && products.length===0 &&<p>No available products</p>}
      
      
      <div className="py-10 gap-8 px-6 grid lg:grid-cols-3 md:grid-cols-2 ">
      {products.map((el) => (
        <Product key={el.id} {...el} />
      ))}
    </div>
      
      
    </main>
  );
};

export default Home;
