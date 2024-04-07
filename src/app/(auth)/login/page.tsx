import React from 'react';
import {auth, signIn} from "../../../lib/auth";
import LoginForm from "../../../components/loginForm/LoginForm";

const LoginPage = async () => {

    // session里面有github登陆用户的信息；
    const session = await auth()



    const handleGithubLogin = async () => {
        // 'use server'表示此方法是server端的方法；
        'use server'
        // signIn()是src/lib/auth.ts文件中，用github登陆使用的方法；
        await signIn('github')
    }

    return (
        <div>
            <form action={handleGithubLogin}>
                <button>Login with Github</button>
            </form>
            <LoginForm />
        </div>
    );
};

export default LoginPage;
