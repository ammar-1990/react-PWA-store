import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { clearUser, getUser, setUser } from "../reduxSlices/userSlice";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import {  setCart, setCartLoading } from "../reduxSlices/cartSlice";
import { setProducts, setProductsError } from "../reduxSlices/productsSlice";
import { getDocs } from "firebase/firestore";
import { getCartTotal } from "../reduxSlices/cartSlice";
import {ChartBarIcon} from '@heroicons/react/24/solid'
const LayOut = () => {
  const { user, isLoading } = useSelector(getUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const q = query(collection(db, "products"),orderBy("timestamp", "desc"))
 
    const unsub = onSnapshot(
      q,
      (querySnapshot) => {
      
        let list = [];
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });

        dispatch(setProducts(list));
      },
      (error) => {
        console.log('products error',error);

        dispatch(setProductsError(error))
      }
    );
    return () => {
      unsub();
    };
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(
          setUser({
            username: user.displayName,
            email: user.email,
            id: user.uid,
          })
        );
        const q = query(collection(db, `cart`));
        const unsub = onSnapshot(
          q,
          (querySnapshot) => {
            let list = [];
            querySnapshot.forEach((doc) => {
              list.push({ id: doc.id, ...doc.data() });
            });

            dispatch(setCart(list));
          },
          (error) => {
            console.log(error);
          }
        );
        return () => {
          unsub();
        };
      } else {
        dispatch(clearUser());
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  useEffect(() => {
    const cartsRef = collection(db, "carts");
    if (user)
      getDocs(cartsRef).then((querySnapshot) => {
        if (!querySnapshot.empty) {
        

          const cartRef = collection(db, "carts", user?.id, "cart");
          getDocs(cartRef).then((querySnapshot) => {
        
              // fetch individual cart
              const q = query(collection(db, "carts", user?.id, "cart"));
              const unsub = onSnapshot(
                q,
                (querySnapshot) => {
                  let list = [];
                  querySnapshot.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() });
                  });
             
                  dispatch(setCart(list));
                  dispatch(setCartLoading(false))
                },
                (error) => {
              
                  console.log('cart error',error);
                }
              );
              return () => {
                unsub();
              };
             
          });
        } else {
     
          dispatch(setCart([]));
        }
      });
  }, [user, dispatch]);

  const cartTotal = useSelector(getCartTotal);
const navigate = useNavigate()


  return (
    <div className="flex flex-col min-h-screen">
      <header className=" py-6 px-3  bg-slate-800 sticky top-0 z-50 select-none">
        <div className="max-w-6xl mx-auto flex sm:flex-row min-w-fit flex-col sm:gap-0 gap-8 items-center justify-between text-white">
          <Link to={"/"}>
            <h1 className="sm:text-2xl capitalize cursor-pointer font-sans font-semibold flex items-center gap-1">
              Alpha{" "}
              <span className="p-1 bg-orange-400 inline-flex text-slate-900  justify-center items-center rounded-md">
                store
              </span>
            </h1>
          </Link>
          <nav
            className={`${
              isLoading ? "opacity-0" : "opacity-100"
            } duration-150 flex gap-8 items-center w-full `}
          >
         

            {user ? (
             
                
              <div className={`flex w-full sm:gap-8 items-center sm:justify-end justify-between  duration-150`}>
              <p className={`text-white capitalize duration-150 sm:text-base text-xs`}>
                {" "}
                Welcome <span>{user?.username}</span>
              </p>
            <div role="button" onClick={()=>navigate('/admin')} className="flex sm:text-base text-xs items-center gap-1 text-pointer">
              <span className=" ">Admin panel </span>
              <ChartBarIcon className="h-6 rounded-full w-6  p-[3px] bg-white text-orange-400" /></div>
                <Link to={"/cart"} className="relative">
                  <span
                    className={`absolute  -top-1 -right-1 sm:h-4 sm:w-4 h-3 w-3 rounded-full p-1 text-xs bg-red-500 text-white flex items-center  ${
                      !cartTotal ? "opacity-0" : "opacity-100"
                    }  duration-150 justify-center`}
                  >
                    {cartTotal}
                  </span>
                  <ShoppingCartIcon className="h-6 sm:h-8 text-orange-400 cursor-pointer " />
                </Link>
                <button onClick={() => signOut(auth)} className="text-white sm:text-base text-xs">
                  Sign out
                </button>
              </div>
            ) : (
              <div className="flex justify-center  w-full sm:justify-end">
                <Link to={"/login"}>
                  <span className="text-white text-md cursor-pointer">
                    Login /
                  </span>
                </Link>
                <Link to={"/register"}>
                  <span className="text-white text-md cursor-pointer">
                    {" "}
                    Register
                  </span>
                </Link>
              </div>
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
