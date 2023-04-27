import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../reduxSlices/productsSlice";
import { setProducts } from "../reduxSlices/productsSlice";
import Product from "../components/Product";

const Home = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector(getProducts);

  useEffect(() => {
    const q = query(collection(db, "products"));
    const unsub = onSnapshot(
      q,
      (querySnapshot) => {
        let list = [];
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        console.log(list);
        dispatch(setProducts(list));
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, [dispatch]);

  return (
    <main className="max-w-6xl mx-auto ">
         <h1 className="text-center text-slate-900 text-4xl uppercase py-3">products</h1>
      {isLoading ? (
        <div className="text-slate-900 animate-pulse text-xl text-center p-3">loading ...</div>
      ) : (
      
      
      <div className="py-10 gap-8 px-6 grid lg:grid-cols-3 md:grid-cols-2 ">
      {products.map((el) => (
        <Product key={el.id} {...el} />
      ))}
    </div>
      
      )}
    </main>
  );
};

export default Home;