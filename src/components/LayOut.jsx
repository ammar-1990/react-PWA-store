import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { clearUser, getUser, setUser } from "../reduxSlices/userSlice";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import { getCart, setCart } from "../reduxSlices/cartSlice";
import { setProducts } from "../reduxSlices/productsSlice";
import { getDocs } from "firebase/firestore";
import { getCartTotal } from "../reduxSlices/cartSlice";


const LayOut = () => {
  const { user, isLoading } = useSelector(getUser);
  const dispatch = useDispatch();


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






  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user)
      {
        dispatch(setUser({ username: user.displayName, email: user.email,id:user.uid }));
        const q = query(collection(db, `cart`));
    const unsub = onSnapshot(
      q,
      (querySnapshot) => {
        let list = [];
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        console.log(list,'hi');
        dispatch(setCart(list))
       
      
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };


      
      }



      else {
        dispatch(clearUser());
      }
      console.log(user);
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);





  useEffect(
    ()=>{

      const cartsRef = collection(db,'carts')
      if(user)
      getDocs(cartsRef)
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
console.log('carts exist')
         const cartRef = collection(db,'carts',user?.id,'cart')
         getDocs(cartRef)
         .then((querySnapshot) => {
           if (!querySnapshot.empty) {
// fetch individual cart 
const q = query(collection(db,'carts',user?.id,'cart'))
const unsub = onSnapshot(q,(querySnapshot) => {
  let list =[];
 querySnapshot.forEach(doc=>{
   list.push({id:doc.id,...doc.data()})

  })
  console.log(list)
dispatch(setCart(list))


  
 },(error)=>{
   console.log(error)
 });
 return ()=> {
   unsub();
 };

           }
          else{
            console.log('no cart ')
            dispatch(setCart([]))
          }
          })


        }
      
      else {
        console.log('no carts')
        dispatch(setCart([]))
      }})
   
},[user,dispatch])

const cartTotal = useSelector(getCartTotal)
const {isLoading:cartLoading , cart } = useSelector(getCart)








  return (
    <div className="flex flex-col min-h-screen">
      <header className=" py-6 px-3  bg-slate-800 sticky top-0">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-white">
          <Link to={"/"}>
            <h1 className="text-2xl capitalize cursor-pointer font-sans font-semibold">
              Alpha{" "}
              <span className="p-1 bg-orange-400 inline-flex text-slate-900  justify-center items-center rounded-md">
                store
              </span>
            </h1>
          </Link>
          <nav
            className={`${
              isLoading ? "opacity-0" : "opacity-100"
            } duration-150 flex gap-8 items-center`}
          >

{user && <p className={`text-white capitalize ${!cartTotal ? 'opacity-0' : 'opacity-100'} duration-150 `}> Welcome <span>{user?.username}</span></p>}

            {user ? (<div className={`flex gap-4 items-center ${!cartTotal ? 'opacity-0' : 'opacity-100'} duration-150`} >
              <Link to={"/cart"} className="relative">
                <span className={`absolute  -top-2 -right-2 h-4 w-4 rounded-full p-1 bg-red-500 text-white flex items-center  duration-150 justify-center`}>{cartTotal}</span>
                <ShoppingCartIcon className="h-8 text-orange-400 cursor-pointer " />
              </Link>
              <button onClick={()=>signOut(auth)} className="text-white">
                Sign out
              </button>
              </div> ) : (<>
              <Link to={"/login"}>
                <span className="text-white text-md cursor-pointer">Login /</span>
              </Link>
              <Link to={"/register"}>
                <span className="text-white text-md cursor-pointer"> Register</span>
              </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1 b">
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default LayOut;
