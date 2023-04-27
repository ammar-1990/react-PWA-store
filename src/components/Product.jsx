import {StarIcon} from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'

const Product = ({id,description, title, rate, image,price}) => {
  return (
    <article>
<img className='object-contain h-[300px] w-full' src={image} alt="" />
<div className='p-4 bg-white'>
<h1 className='capitalize font-semibold py-2'>{title}</h1>
<p>{description}</p>
<div className='flex gap-1 py-4'>
{Array(rate).fill().map((_,i)=><StarIcon className='h-6 text-yellow-400' key={i} />)}
</div>

<p className='py-2 italic'>${price}</p>
</div>
<Link to={`product/${id}`} ><button className='py-3 bg-orange-400 w-full'>See More</button></Link>

    </article>
  )
}

export default Product