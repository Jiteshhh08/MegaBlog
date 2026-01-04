import React from 'react'
import service from "../appwrite/config"
import {Link} from "react-router-dom"

function PostCard({$id, title, featuredImage}) {
  return (
    <Link to={`/Post/$id`}>
        <div className="bg-blue-400 p-4 rounded-xl w-full">
            <div className="w-full justify-center mb-4">
                <img src={service.getFilePreview(featuredImage)} alt="title" className='rounded-xl'/>
            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
)
}

export default PostCard