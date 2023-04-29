import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { getProducts } from "../reduxSlices/productsSlice"
import {StarIcon} from '@heroicons/react/24/solid'
import { getUser } from "../reduxSlices/userSlice"
import { doc, setDoc ,updateDoc} from "firebase/firestore"; 
import { db } from "../firebase"
import { getCart } from "../reduxSlices/cartSlice"
import { useLocation } from "react-router-dom"


const ProductDetail = () => {
const {id} = useParams()
const location = useLocation()
console.log(location)


const {products} = useSelector(getProducts)
const product = products.find(el=>el.id === id)
const navigate = useNavigate()
const {user} = useSelector(getUser)
const {cart} = useSelector(getCart)
const itemExist  = cart.findIndex(el=>el.id===product.id) 
const item = cart.find(el=>el.id === product.id)

const handleClick = async ()=>{

if(!user)
navigate('/login')
else {

  if(itemExist !== -1)
  {
    const docRef = doc(db, "carts", user?.id,'cart',product.id);

  
    await updateDoc(docRef, {
      quantity:item.quantity +1
    });
  }
  else{ await setDoc(doc(db, "carts", user.id,'cart',product.id), {
    title:product.title,
    description:product.description,
    price:product.price,
    rate:product.rate,
    image:product.image,
    quantity:1,
   });
   console.log('added')}
 
  
}

}


  return ( !product ? <p className="text-center text-3xl py-12 text-gray-700 animate-pulse">Loading...</p>:
  
   <div className="max-w-6xl mx-auto pt-12"> 
   <button onClick={()=>navigate(-1)} className='block ml-auto font-semibold mb-10 px-10 py-4 bg-slate-900 text-white m-2'>Back</button>
   <div className="  grid md:grid-cols-2 gap-8">
    
      <div className="">
        <img className="w-full h-[500px] object-contain" src={product?.image} alt="" />
      </div>
      <div className=" flex flex-col gap-12 p-6">

        <p className="font-bold ">{product?.title}</p>
        <p className="text-gray-700">{product?.description}</p>
        <div className="flex gap-3">{Array(+product?.rate).fill().map((_,i)=><StarIcon key={i} className='h-6 text-yellow-500'/>)}</div>
        <p className="italic">$ {product?.price}</p>

       {location.state !=='/admin' && <button onClick={handleClick} className="px-8 py-4 bg-orange-400 text-slate-900 hover:bg-orange-500 duration-150 font-semibold mt-auto">Add to cart</button>}





      </div>

      
      </div>

      </div>
  )
}

export default ProductDetail