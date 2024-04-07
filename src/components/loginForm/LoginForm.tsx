"use client";

import { login } from "@/lib/actions";
import styles from "./loginForm.module.css";
// import { useFormState } from "react-dom";
import Link from "next/link";
import {useFormState} from "react-dom";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

const LoginForm = () => {
    const [state, formAction] = useFormState(login, {})

    const router = useRouter()

    useEffect(() => {
        // 跳转页面；
        state?.success && router.push("/");
    }, [state?.success])


    return (
        <form className={styles.form} action={formAction}>
            <input type="text" placeholder="username" name="username" />
            <input type="password" placeholder="password" name="password" />
            <button>Login</button>
            {state?.error}
            <Link href="/register">
                {"Don't have an account?"} <b>Register</b>
            </Link>
        </form>
    );
};

export default LoginForm;