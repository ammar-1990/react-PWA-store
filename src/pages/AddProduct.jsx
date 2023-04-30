import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { addDoc, serverTimestamp, collection } from "firebase/firestore"; 
import { db, storage } from "../firebase";


import { useDispatch, useSelector } from "react-redux";

import { getProduct } from "../reduxSlices/productSlice";
import { useParams } from "react-router-dom";
import { setProduct } from "../reduxSlices/productSlice";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [rate, setRate] = useState('');
  const [price, setPrice] = useState('');
  const [url, setUrl] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false)
  const {id} = useParams()
  const dispatch = useDispatch()

  const imageRef = useRef();

  const handleSubmit = async (e)=> {
    setLoading(true)
e.preventDefault()
   if(!image){
    await addDoc(collection(db, "products"), {

      title,
      description:desc,
      rate:+rate,
      price,
   image:url,
     
      timestamp:serverTimestamp()
    });
   }

   if(image){
    
  const imageRef = ref(storage, `posts/${id}/image`);

  await uploadBytes(imageRef, image).then(
    async (snapshot) => {
      const downloadURL = await getDownloadURL(imageRef);
      await addDoc(collection(db, "products"), {

        title,
        description:desc,
        rate:+rate,
        price,
     image:downloadURL,
       
        timestamp:serverTimestamp()
      });
  
    }
  ).catch((err)=>console.log(err));



   }



    setTitle('')
    setDesc('')
    setRate('')
    setPrice('')
    setUrl('')
    setImage(null)
    setLoading(false)
  }


  const handleEdit = async(e)=> {
    setLoading(true)
e.preventDefault()
if(!image){
  const productRef = doc(db, "products",id);
  await updateDoc(productRef, {
    title,
      description:desc,
      rate:+rate,
      price,
   image:url,
   timestamp:product.timestamp
  });

  }


  if(image){
    const productRef = doc(db, "products",id);
    const imageRef = ref(storage, `posts/${id}/image`);

    await uploadBytes(imageRef, image).then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(productRef, {
          title,
            description:desc,
            rate:+rate,
            price,
         image:downloadURL,
         timestamp:product.timestamp
        });
    
      }
    ).catch((err)=>console.log(err));
  
    
  }

  setTitle('')
  setDesc('')
  setRate('')
  setPrice('')
  setUrl('')
  setImage(null)
  setLoading(false)
  dispatch(setProduct(null))


  



  }
const navigate = useNavigate()
const product = useSelector(getProduct)
useEffect(()=>{

  if(product)
  {
const { title, description, rate, price, image } = product;
setTitle(title)
setDesc(description)
setRate(rate)
setPrice(price)
setUrl(image)
  }



},[product])

useEffect(()=>{

  return()=>{
    dispatch(setProduct(null))
    setTitle('')
    setDesc('')
    setRate('')
    setPrice('')
    setUrl('')
    setImage(null)
    setLoading(false)
  }
},[dispatch])


if(id && !product)
return <Navigate to={'/admin'} />

  return (
    <div>
      <h1 className="text-slate-900 text-center p-4 text-6xl mt-20">
        Admin panel
      </h1>
     
        <form className="w-[400px] mx-auto mt-10 gap-4 flex flex-col">
          {product &&<label className="label">Title</label>}
          <input required type="text" className="input" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
          {product &&<label className="label">Desctiption</label>}
          <input
            required
            value={desc}
            onChange={(e)=>setDesc(e.target.value)}
            type="text"
            className="input"
            placeholder="Description"
          />
             {product &&<label className="label">Rate</label>}
          <input
          onChange={e=>setRate(e.target.value)}
          value={rate}
            max={5}
            min={1}
            required
            type="number"
            className="input"
            placeholder="Rate"
          />
             {product &&<label className="label">Price</label>}
          <input required type="number" className="input" placeholder="Price" onChange={e=>setPrice(e.target.value)} value={price} />
          {product &&<label className="label">Image URL</label>}
          <input value={url} type="text" className="input disabled:opacity-50" placeholder="Image URL" onChange={e=>setUrl(e.target.value)} disabled={image}/>
          <span className="text-center text-gray-700 text-lg">or</span>
          <button
            type="button"
            onClick={() => imageRef.current.click()}
            className="bg-slate-900 py-4 w-full text-white disabled:opacity-60"
            disabled={url || image}
          >
            Upload Image
          </button>
          <input
            hidden
            onChange={(e) => setImage(e.target.files[0])}
            ref={imageRef}
            type="file"
          />
                  {image && (
          <div className="w-full relative">
            <span className="absolute top-0 right-0 bg-slate-900 px-8 py-3 text-red-700 text-md  cursor-pointer"
             onClick={() => setImage(null)}>
              Delete
            </span>
            <img
             
              className="w-full object-contain "
              src={URL.createObjectURL(image)}
              alt="product"
            />
          </div>
        )}
        {product && url && <div className="w-full relative">
            <span className="absolute top-0 right-0 bg-slate-900 px-8 py-3 text-red-700 text-md  cursor-pointer"
             onClick={() => setUrl('')}>
              Delete
            </span>
            <img
             
              className="w-full object-contain "
              src={url}
              alt="product"
            />
          </div>}
         { !product?<button onClick={handleSubmit}  className="bg-slate-900 py-4 w-full text-white disabled:opacity-60"
          disabled={!title || !desc || !price || !rate || (!url&&!image) || loading}>
            {loading ? 'Loading' :'Add Product'}
          </button> : <button  onClick={handleEdit} className="bg-slate-900 py-4 w-full text-white disabled:opacity-60"
          disabled={!title || !desc || !price || !rate || (!url&&!image) || loading}>
            {loading ? 'Loading' :'Edit Product'}
          </button>}

          <button type="button" onClick={()=>navigate(-1)} className="self-start py-4">Back</button>
        </form>

    
    </div>
  );
};

export default AddProduct;
