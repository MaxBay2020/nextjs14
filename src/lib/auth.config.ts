export const authConfig = {
    pages: {
        // 名字必须叫signIn；
        // /login这个route就只middleware，如果用户没登陆了，则显示/login这个route；
        signIn: '/login'
    },
    providers: [],
    callbacks: {
        async jwt({token, user}) {
            // 用户登陆成功后，Nextjs会帮我们生成jwt
            if(user){
                // 在这里追加想要的字段值；
                token.id = user.id
                token.isAdmin = user.isAdmin
            }

            return token
        },

        async session({session, token}) {
            // Nextjs帮我们生成完token之后，会用此token来更新我们的session；
            if(token){
                // 在这里追加想要的字段值；
                session.user.id = token.id
                session.user.isAdmin = token.isAdmin
            }
            return session
        },

        authorized({auth, request}) {
            // 登陆用户的信息通过上面的jwt()方法和session()方法，放在了auth变量中；
            // 我们通过上面追加的isAdmin属性，来判断有些资源是否显示；
            const user = auth?.user
            // 判断用户是否在/admin的route页面上；
            const isOnAdminPortal = request.nextUrl?.pathname.startsWith('/admin')
            // 判断用户是否在/blog的route页面上；
            const isOnBlogPage = request.nextUrl?.pathname.startsWith('/blog')
            // 判断用户是否在/login的route页面上；
            const isOnLoginPage = request.nextUrl?.pathname.startsWith('/login')

            // 如果用户想访问/admin页面，但是用户不是admin；
            if(isOnAdminPortal && !user?.isAdmin){
                // 如果返回的是false，则会跳转到上面的/login页面；
                return false
            }


            // 如果用户想访问/blog页面，但是没有登陆；
            if(isOnBlogPage && !user){
                // 如果返回的是false，则会跳转到上面的/login页面；
                return false
            }

            // 如果用户想访问/login页面，但是用户已经登陆了；
            if(isOnLoginPage && user){
                // 跳转到/页面；
                return Response.redirect(new URL('/', request.nextUrl))
            }

            // 如果返回true，则不进行跳转，什么都不做；
            return true
        }
    }
}