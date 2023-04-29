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
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { getCart, setCart, setCartError, setCartLoading } from "../reduxSlices/cartSlice";
import { setProducts, setProductsError } from "../reduxSlices/productsSlice";
import { getDocs } from "firebase/firestore";
import { getCartTotal } from "../reduxSlices/cartSlice";

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
          console.log("carts exist");
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
                  console.log("cart", list);
                  dispatch(setCart(list));
                  dispatch(setCartLoading())
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
          console.log("no carts");
          dispatch(setCart([]));
        }
      });
  }, [user, dispatch]);

  const cartTotal = useSelector(getCartTotal);

  console.log(cartTotal);

  return (
    <div className="flex flex-col min-h-screen">
      <header className=" py-6 px-3  bg-slate-800 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-white">
          <Link to={"/"}>
            <h1 className="sm:text-2xl capitalize cursor-pointer font-sans font-semibold ">
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
            {user && (
              <p className={`text-white capitalize duration-150 sm:text-base text-xs`}>
                {" "}
                Welcome <span>{user?.username}</span>
              </p>
            )}

            {user ? (
              <div className={`flex gap-4 items-center  duration-150`}>
                <Link to={"/cart"} className="relative mr-5">
                  <span
                    className={`absolute  -top-1 -right-1 sm:h-4 sm:w-4 h-3 w-3 rounded-full p-1 text-xs bg-red-500 text-white flex items-center  ${
                      !cartTotal ? "opacity-0" : "opacity-100"
                    }  duration-150 justify-center`}
                  >
                    {cartTotal}
                  </span>
                  <ShoppingCartIcon className="h-6 sm:h-8 text-orange-400 cursor-pointer " />
                </Link>
                <button onClick={() => signOut(auth)} className="text-white">
                  Sign out
                </button>
              </div>
            ) : (
              <>
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
