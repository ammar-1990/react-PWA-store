import { StarIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useDispatch } from "react-redux";
import { setProduct } from "../reduxSlices/productSlice";



const AdminItem = ({ id, title, description, rate, price, image ,timestamp }) => {

  const navigate = useNavigate()
  const location = useLocation()


const handleDelete =async (e)=>{
  e.stopPropagation();
  if(window.confirm('Are you sure you want to delete this Item ')){

  await deleteDoc(doc(db, "products", id));
  }
  else{
  
  }
 
  }

const dispatch = useDispatch()

  const handleEdit = (e)=>{
    e.stopPropagation();
  
    dispatch(setProduct({id, title, description, rate, price, image ,timestamp }))
navigate(`/admin/edit-product/${id}`)




  }


  return (
    <tr onClick={()=>navigate(`/product/${id}`,{state:location.pathname})} className="bg-gray-200 hover:bg-gray-200/60 duration-200 cursor-pointer hover:scale-[1.03]">
      <th className="p-3 font-normal capitalize  ">{title}</th>
      <th className="p-3 font-normal  truncate max-w-[300px]">
        {description}
      </th>
      <th className="p-3  ">
        {
          <div className="flex gap-1">
            {Array(+rate)
              .fill()
              .map((_, i) => (
                <StarIcon className="h-4 text-yellow-600" key={i} />
              ))}
          </div>
        }
      </th>
      <th className="p-3 italic font-normal ">$ {price}</th>
      <th className="p-3  ">
        <img src={image} className="w-12 h-12 rounded-full block mx-auto object-contain " alt="product"/>
      </th>
      <th className="p-3 font-normal ">
        <button onClick={handleEdit}  className="px-2 py-1 bg-slate-900 text-white hover:opacity-70 duration-150">Edit</button>
        <button onClick={handleDelete} className="px-2 py-1 bg-red-700 text-white hover:opacity-70 duration-150">Delete</button>
      </th>
     
    </tr>
  );
};

export default AdminItem;
