import {authConfig} from "./lib/auth.config";
import NextAuth from "next-auth";


export const config = {
    // 下面的代码的意思是：middleware不会应用于api route等；也就是只会应用于页面；
    matcher: ["/((?!api|static|.*\\..*|_next).*)"],
}

export default NextAuth(authConfig).auth
