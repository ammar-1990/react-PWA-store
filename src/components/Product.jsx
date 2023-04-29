import { StarIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { doc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { getUser } from "../reduxSlices/userSlice";
import { db } from "../firebase";
import { getCart } from "../reduxSlices/cartSlice";
import {ShoppingCartIcon} from '@heroicons/react/24/outline'

const Product = ({ id, description, title, rate, image, price }) => {
  const { user } = useSelector(getUser);
  const { cart } = useSelector(getCart);
  const itemExist = cart.findIndex((el) => el.id === id);
  const item = cart.find((el) => el.id === id);
const toAdd = async ()=> {
  await setDoc(doc(db, "carts", user.id,'cart',id), {
    title:title,
    description:description,
    price:price,
    rate:rate,
    image:image,
    quantity:1,
   });
}
  const addHandle = async () => {
   
    const docRef = doc(db, "carts", user?.id, "cart", id);

    await updateDoc(docRef, {
      quantity: item.quantity + 1,
    });
  };

  const minusHandle = async () => {
    if (item.quantity === 1) {
      await deleteDoc(doc(db, "carts", user.id, "cart", id));
    } else {
      const docRef = doc(db, "carts", user?.id, "cart", id);
      await updateDoc(docRef, {
        quantity: item.quantity - 1,
      });
    }
  };

  return (
    <article className="shadow-md hover:scale-105 duration-200  flex flex-col  ">
      <img className="object-contain h-[300px] w-full" src={image} alt="" />
      <div className="p-4 bg-white flex-1 mb-5">
        <h1 className="capitalize font-semibold py-2">{title}</h1>
        <p className="line-clamp-3 ">{description}</p>
        <div className="flex gap-1 py-4">
          {Array(+rate)
            .fill()
            .map((_, i) => (
              <StarIcon className="h-6 text-yellow-400" key={i} />
            ))}
        </div>

        <p className="py-2 italic">${price}</p>
      </div>
      {itemExist === -1 && (
        <button onClick={toAdd} className="bg-orange-400 flex gap-2 py-1  text-white pl-2 pr-4 rounded-r-full text-sm max-w-fit mb-10">
      Add to cart  <ShoppingCartIcon className="h-5 text-white" />  {" "}
        </button>
      )}
      {item && (
        <div className="p-2 border text-sm w-full border-r-0 border-l-0 mb-10 flex items-center gap-4 justify-center">
          <span>in cart</span>
          <button onClick={addHandle} className="p-2 font-bold text-xl">+</button> {item.quantity}
          <button onClick={minusHandle} className="p-2 font-bold text-xl">-</button>
        </div>
      )}
      <Link className="mt-auto" to={`product/${id}`}>
        <button className="py-3 bg-orange-400 w-full text-slate-900 hover:bg-orange-500 duration-150 font-semibold">
          See More
        </button>
      </Link>
    </article>
  );
};

export default Product;
