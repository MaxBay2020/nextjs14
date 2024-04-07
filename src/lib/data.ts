import connectToDb from "./utils";
import {Post, User} from "./models";

export const queryAllPosts = async () => {
    try {
        await connectToDb()
        const posts = await Post.find()
        return posts
    }catch (e) {
        console.log(e)
        throw new Error(e)
    }
}

export const queryPostBySlug = async (slug) => {
    try {
        await connectToDb()
        const post = await Post.findOne({ slug })
        return post
    }catch (e) {
        console.log(e)
        throw new Error(e)
    }
}


export const queryAllUsers = async () => {
    try {
        await connectToDb()
        const users = await User.find()
        return users
    }catch (e) {
        console.log(e)
        throw new Error(e)
    }
}

export const queryUserByUserId = async (userId) => {
    try {
        await connectToDb()
        const user = await User.findById(userId)
        return user
    }catch (e) {
        console.log(e)
        throw new Error(e)
    }
}
