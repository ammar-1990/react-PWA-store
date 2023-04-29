import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, addDoc, serverTimestamp, collection } from "firebase/firestore"; 
import { db } from "../firebase";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [rate, setRate] = useState('');
  const [price, setPrice] = useState('');
  const [url, setUrl] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false)

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



    setTitle('')
    setDesc('')
    setRate('')
    setPrice('')
    setUrl('')
    setImage(null)
    setLoading(false)
  }
const navigate = useNavigate()
  return (
    <div>
      <h1 className="text-slate-900 text-center p-4 text-6xl mt-20">
        Admin panel
      </h1>
     
        <form onSubmit={handleSubmit} className="w-[400px] mx-auto mt-10 gap-4 flex flex-col">
          <input required type="text" className="input" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
          <input
            required
            value={desc}
            onChange={(e)=>setDesc(e.target.value)}
            type="text"
            className="input"
            placeholder="Description"
          />
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
          <input required type="number" className="input" placeholder="Price" onChange={e=>setPrice(e.target.value)} value={price} />
          <input type="text" className="input disabled:opacity-50" placeholder="Image URL" onChange={e=>setUrl(e.target.value)} disabled={image}/>
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
          <button  className="bg-slate-900 py-4 w-full text-white disabled:opacity-60"
          disabled={!title || !desc || !price || !rate || (!url&&!image) || loading}>
            {loading ? 'Loading' :'Add Product'}
          </button>

          <button onClick={()=>navigate(-1)} className="self-start py-4">Back</button>
        </form>

    
    </div>
  );
};

export default AddProduct;
