import React from 'react'

const AddToCart = ({params}) => {
  console.log(params);
  return (
    <div className='w-full min-h-screen h-auto'>
      AddToCart
      <div className="flex justify-center items-center text-center flex-col gap-4">
        <span>Main : {decodeURIComponent(params.exploreSlug)}</span>
        <span>Sub Category : {decodeURIComponent(params.parts)}</span>
        <span>Part Category : {decodeURIComponent(params.schemaItems)}</span>
        <span>Part Name : {decodeURIComponent(params.addToCart)}</span>
      </div>
      
      </div>
  )
}

export default AddToCart