import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { clearUser, getUser, setUser } from "../reduxSlices/userSlice";
import { auth } from "../firebase";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

const LayOut = () => {
  const { user, isLoading } = useSelector(getUser);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user)
        dispatch(setUser({ username: user.displayName, email: user.email }));
      else {
        dispatch(clearUser());
      }
      console.log(user);
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className=" py-6 px-3  bg-slate-800">
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
            } duration-150`}
          >
            {user ? (
              <Link to={"/cart"}>
                <ShoppingCartIcon className="h-8 text-orange-400 cursor-pointer " />
              </Link>
            ) : (
              <Link to={"/login"}>
                <span className="text-white text-md cursor-pointer">Login</span>
              </Link>
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
