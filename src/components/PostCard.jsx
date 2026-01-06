import React, { useState, useEffect } from "react";
import service from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (featuredImage) {
      setImageUrl(service.getFilePreview(featuredImage));
    }
  }, [featuredImage]);
  
  return (
    <Link to={`/Post/${$id}`}>
      <div className="bg-blue-400 p-4 rounded-xl w-full">
        <div className="w-full justify-center mb-4">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-48 object-cover"
            />
          )}
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
