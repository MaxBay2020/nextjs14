"use client";

import { register } from "@/lib/actions";
import styles from "./registerForm.module.css";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterForm = () => {
    // useFormState(第一个参数，第二个参数)；
    // 第一个参数：是一个方法，此方法的返回值会作为新的state，放在左边的state值中；
    // 第二个参数：是state的初始值；
    const [state, formAction] = useFormState(register, {});

    const router = useRouter();

    useEffect(() => {
        // 跳转页面；
        state?.success && router.push("/login");
    }, [state?.success])


    return (
        <form className={styles.form} action={formAction}>
            <input type="text" placeholder="username" name="username" />
            <input type="email" placeholder="email" name="email" />
            <input type="password" placeholder="password" name="password" />
            <input
                type="password"
                placeholder="password again"
                name="passwordRepeat"
            />
            <button>Register</button>
            {state?.error}
            <Link href="/login">
                Have an account? <b>Login</b>
            </Link>
        </form>
    );
};

export default RegisterForm;