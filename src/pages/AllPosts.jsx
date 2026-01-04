import React, { useEffect } from 'react'
import service from '../appwrite/config'
import { Container, PostCard } from '../components'

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect( () => {
        service.getPosts([]).then((posts) => {
            if(posts){
                setPosts(posts.document)
            }
        })
    },[] )
  return (
    <div className='w-full py-8'>
        <container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </container>
    </div>
  )
}

export default AllPosts