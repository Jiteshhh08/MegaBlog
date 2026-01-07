import React, {useEffect, useState} from 'react'
import service from "../appwrite/config";
import {Container, PostCard} from '../components'
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([])

    const userData = useSelector((state) => state.auth.userData);
    useEffect(() => {
        if (!userData || !userData.$id){
            setPosts([])
            return;
        }
        service.getPostsByAuthor(userData.$id).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [userData])
  
    if (!userData) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap justify-center'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 min-w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home