// import { getUser } from "@/lib/data";
import styles from "./postUser.module.css";
import Image from "next/image";
import {queryUserByUserId} from "../../lib/data";

// // FETCH DATA WITH AN API
// const getData = async (userId) => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}` ,{cache:"no-store"});
//
//   if (!res.ok) {
//     throw new Error("Something went wrong");
//   }
//
//   return res.json();
// };

const PostUser = async ({ userId }) => {

    const user = await queryUserByUserId(userId);

    return (
        <div className={styles.container}>
            <Image
                className={styles.avatar}
                src={user.img ? user.img : "/noavatar.png"}
                alt=""
                width={50}
                height={50}
            />
            <div className={styles.texts}>
                <span className={styles.title}>Author</span>
                <span className={styles.username}>{user.username}</span>
            </div>
        </div>
    );
};

export default PostUser;