import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import connectToDb from "./utils";
import {User} from "./models";
import bcrypt from 'bcrypt'
import {authConfig} from "./auth.config";


// 用Github进行登陆
export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),

        // 设置用户名密码登陆；在这里来验证用户名密码是否匹配；
        CredentialsProvider({
            async authorize(credentials){
                // console.log(credentials)
                const user = login(credentials)
                return user
            }
        })
    ],

    // 我们使用callbacks来进行OAuth登陆的后续处理，如查询该用户是否存在于我们的数据库，如果不存在则创建，如果存在则返回
    callbacks: {
        // signIn()方法的返回值是布尔值；登陆成功返回true，登陆失败返回false；
        async signIn({user, account, profile}) {
            // console.log(user)
            // console.log(account)
            // console.log(profile)

            // 如果用户是使用github进行登陆的；
            if(account.provider === 'github'){
                await connectToDb()
                try {
                    const user = await User.findOne({ email: profile.email })
                    if(!user){
                        // 如果使用OAuth登陆的用户在我们的db中不存在，则创建该用户
                        const newUser = new User({
                            username: profile.login,
                            email: profile.email,
                            image: profile.avatar_url
                        })
                        await newUser.save()
                    }
                    // 用户登陆成功时，返回true
                    return true
                }catch (e) {
                    console.log(e)
                    // 当我们自己的db出现异常，则返回false，即使用户已经使用OAuth进行登陆了，我们也视为未登陆；
                    return false
                }
            }

            // 如果用户是使用的用户名和密码登陆的；
            if(account.provider === 'credentials'){
                return true
            }
        },
        ...authConfig.callbacks
    },

})

const login = async (credentials) => {
    try {
        await connectToDb()
        const user = await User.findOne({ username: credentials.username })

        if(!user){
            // 如果用户不存在；
            console.log('no such user')
        }

        // 验证密码是否匹配；
        const isPasswordMatch = await bcrypt.compare(credentials.password, user.password)

        if(!isPasswordMatch){
            console.log('username or password not correct')
        }

        // 匹配成功，则返回该user
        return user

    }catch (e) {
        console.log(e)
    }
}
