import Image from "next/image";
import styles from "./singlePost.module.css";
import {Suspense} from "react";
// import { getPost } from "@/lib/data";
import PostUser from "@/components/postUser/PostUser";
import {queryPostBySlug} from "../../../lib/data";

// FETCH DATA WITH AN API
// const getData = async (blogId) => {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${blogId}`);
//     // if (!res.ok) {
//     //     throw new Error("Something went wrong");
//     // }
//
//     return res.json();
// };

// export const generateMetadata = async ({params}) => {
//     const {slug} = params;
//
//     const post = await getData(slug);
//
//     return {
//         title: post.title,
//         description: post.desc,
//     };
// };

export const generateMetadata = async ({params}) => {
    const { slug } = params
    const post = await queryPostBySlug(slug)
    return {
        title: post.title
    }
}

const getPostBySlug  = async (slug) => {
    const res = await fetch(`http://localhost:3000/api/blog/${slug}`, { cache: 'no-store' })
    return res.json()
}

const SinglePostPage = async ({params}) => {
    const {slug} = params;

    // FETCH DATA WITH AN API
    const post = await getPostBySlug(slug);

    // FETCH DATA WITHOUT AN API
    // const post = await getPost(slug);

    return (
        <div className={styles.container}>
            {post.img && (
                <div className={styles.imgContainer}>
                    <Image src={post.img} alt="" fill className={styles.img}/>
                </div>
            )}
            <div className={styles.textContainer}>
                <h1 className={styles.title}>{post.title}</h1>
                <div className={styles.detail}>
                    {post && (
                        <Suspense fallback={<div>Loading...</div>}>
                            <PostUser userId={post.userId}/>
                        </Suspense>
                    )}
                    <div className={styles.detailText}>
                        <span className={styles.detailTitle}>Published</span>
                        <span className={styles.detailValuPostUsere}>
                            {post.createdAt.toString().slice(4, 16)}
                        </span>
                    </div>
                </div>
                <div className={styles.content}>{post.desc}</div>
            </div>
        </div>
    );
};

export default SinglePostPage;