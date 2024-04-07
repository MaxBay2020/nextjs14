// 此文件里的方法都是server端的方法；
'use server'

import connectToDb from "./utils";
import {User} from "./models";
import bcrypt from 'bcrypt'
import {signIn} from "./auth";

// 用户注册；
export const register = async (_previousState, formData: FormData) => {
    // 获取表单信息，需要和input上的name的值保持一致；
    const { username, email, password, img, passwordRepeat } =
        Object.fromEntries(formData)

    if (password !== passwordRepeat) {
        return { error: "Passwords do not match" };
    }

    try {
        await connectToDb();

        // 先检查注册用户是否已经存在
        const user = await User.findOne({ username });

        if (user) {
            return { error: "Username already exists" };
        }

        // 给密码进行加密；
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 创建user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            img,
        });

        await newUser.save();

        return { success: true };
    } catch (err) {
        console.log(err);
        return { error: "Something went wrong!" };
    }
};


// 用户登陆；
export const login = async (_previousState, formData) => {
    // 获取表单信息，需要和input上的name的值保持一致；
    const { username, password } = Object.fromEntries(formData)

    try {
        // 使用Authjs提供的signIn()方法
        await signIn('credentials', { username, password })
    } catch (err) {
        console.log(err);

        if(err.type === 'CredentialsSignin'){
            return { error: "Invalid username or password" };
        }
        throw err
    }

}