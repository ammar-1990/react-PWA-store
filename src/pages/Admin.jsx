
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import AdminItem from "../components/AdminItem"
import { useEffect} from "react"
import { db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, setProducts } from "../reduxSlices/productsSlice";
import { Link, useNavigate } from "react-router-dom";




const Admin = () => {
    const dispatch = useDispatch()
 

    const {products , isLoading} = useSelector(getProducts)


// 



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
            console.log(error);
          }
        );
        return () => {
          unsub();
        };
      }, [dispatch]);

      const navigate = useNavigate()



  return (
    <div className="max-w-6xl mx-auto  h-screen flex flex-col py-3">
    <div className="flex justify-between items-center">  <h1 className="text-slate-900 text-center p-4 text-6xl">Admin panel</h1> <button onClick={()=>navigate('/')} className="bg-slate-900 text-white px-4 py-2 ">Home page</button></div>
              
          
           
    <div className="flex-1 overflow-y-scroll scrolled overflow-x-hidden">
<table className="w-full  border-white border-separate">
<thead className="">

    <tr>
        <th className="p-3 bg-slate-900 text-white text-semibold">Title</th>
        <th className="p-3 bg-slate-900 text-white text-semibold">Discription</th>
        <th className="p-3 bg-slate-900 text-white text-semibold">Rate</th>
        <th className="p-3 bg-slate-900 text-white text-semibold">Price</th>
        <th className="p-3 bg-slate-900 text-white text-semibold">Image</th>
        <th className="p-3 bg-slate-900 text-white text-semibold">Control</th>
    </tr>
</thead>

<tbody className=" ">
{isLoading&& <tr><td>Loading...</td></tr>}
{!isLoading&&products.length ===0 &&<tr><td>No products available</td></tr> }
    {products.map((el)=><AdminItem key={el.id} {...el} />)}
</tbody>

</table>
</div>
<Link to={'/admin/add-product'} ><button className="bg-slate-900 w-full text-white py-4 mt-4">Add new product</button></Link>





    </div>
  )
}

export default Admin