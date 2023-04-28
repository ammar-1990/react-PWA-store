import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { getProducts } from "../reduxSlices/productsSlice"
import {StarIcon} from '@heroicons/react/24/solid'
import { getUser } from "../reduxSlices/userSlice"
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../firebase"

const ProductDetail = () => {
const {id} = useParams()


const {products} = useSelector(getProducts)
const product = products.find(el=>el.id === id)
const navigate = useNavigate()
const {user, isLoading} = useSelector(getUser)

const handleClick = async ()=>{
if(!user)
navigate('/login')
else {
  console.log('buy')
  await setDoc(doc(db, "carts", user.id,'cart',product.id), {
   title:product.title,
   description:product.description,
   price:product.price,
   rate:product.rate,
   image:product.image,
   quantity:1,
  });
  console.log('added')
  
}

}


  return ( !product ? <p className="text-center text-3xl py-12 text-gray-700 animate-pulse">Loading...</p>:
   <div className="max-w-6xl mx-auto pt-12"> <div className="  grid md:grid-cols-2 gap-8">
      <div className="">
        <img className="w-full h-[500px] object-contain" src={product?.image} alt="" />
      </div>
      <div className=" flex flex-col gap-12">

        <p className="font-bold ">{product?.title}</p>
        <p className="text-gray-700">{product?.description}</p>
        <div className="flex gap-3">{Array(product?.rate).fill().map((_,i)=><StarIcon key={i} className='h-6 text-yellow-500'/>)}</div>
        <p className="italic">$ {product?.price}</p>

        <button onClick={handleClick} className="px-8 py-4 bg-orange-400 text-slate-900 hover:bg-orange-500 duration-150 font-semibold mt-auto">Add to cart</button>





      </div>

      
      </div>
      <button onClick={()=>navigate(-1)} className="font-semibold text-2xl  block ml-auto mt-8">BACK</button>
      </div>
  )
}

export default ProductDetail