import { StarIcon } from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/24/solid";
import { MinusIcon } from "@heroicons/react/24/solid";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { getUser } from "../reduxSlices/userSlice";

const CartItem = ({ id, title, description, image, rate, price, quantity }) => {
  const { user } = useSelector(getUser);

  const addHandle = async () => {
    console.log("add");

    const docRef = doc(db, "carts", user?.id, "cart", id);

    await updateDoc(docRef, {
      quantity: quantity + 1,
    });
  };

  const minusHandle = async () => {
    if (quantity === 1) {
      await deleteDoc(doc(db, "carts", user.id, "cart", id));
    } else {
      const docRef = doc(db, "carts", user?.id, "cart", id);
      await updateDoc(docRef, {
        quantity: quantity - 1,
      });
    }
  };

  const handleRemove = async () => {
    await deleteDoc(doc(db, "carts", user.id, "cart", id));
  };

  return (
    <article className="grid md:grid-cols-6 p-4 md:items-center border-b">
      <div className="md:col-span-2">
        <img src={image} className="w-full object-contain h-[300px]" alt="" />
      </div>
      <div className="md:col-span-4 mt-10 md:mt-0">
        <h1 className="py-2 font-semibold text-lg capitalize">{title}</h1>
        <p className="capitalize text-gray-600 text-sm py-5">{description}</p>
        <div className="flex gap-1 py-5">
          {Array(rate)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-6 text-yellow-500" />
            ))}
        </div>

        <p className="italic text-lg text-gray-700">$ {price}</p>

        <div className="flex items-center gap-6 py-8">
          <span>Quantity</span>
          <div className="flex items-center gap-3 p-2">
            <PlusIcon
              onClick={addHandle}
              className="h-4 text-slate-900 cursor-pointer"
            />
            <span>{quantity}</span>
            <MinusIcon
              onClick={minusHandle}
              className="h-4 text-slate-900 cursor-pointer"
            />
          </div>
        </div>

        <button
          onClick={handleRemove}
          className="py-4 bg-slate-900 text-white px-20"
        >
          Remove Item
        </button>
      </div>
    </article>
  );
};

export default CartItem;
