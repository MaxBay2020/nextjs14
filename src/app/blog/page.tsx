import React from 'react';
import PostCard from "../../components/postCard/PostCard";
import {queryAllPosts} from "../../lib/data";

// const fetchData = async () => {
//     // Nextjs中是通过fetc()方法进行api请求的，我们如果不想进行cache，可以设置第二个参数cache的值为no-store即可，cache的默认值是force-cache；
//     // const res = await fetch('https://jsonplaceholder.typicode.com/posts', { cache: 'no-store' })
//
//     // 我们也可以设置cache的过期时间，里面的10的单位是秒
//     const res = await fetch('https://jsonplaceholder.typicode.com/posts', { next: { revalidate: 5 } })
//     if(!res.ok){
//         throw new Error('Something went wrong')
//     }
//
//     return res.json()
// }

const getAllPosts = async () => {
    const res = await fetch('http://localhost:3000/api/blog', { cache: 'no-store' })
    return res.json()
}

const BlogPage = async () => {

    const posts = await getAllPosts()


    return (
        <div>
            {
                posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))
            }
        </div>
    );
};

export default BlogPage;
