import React from 'react';
import Link from "next/link";
import styles from './links.module.css'
import NavLink from "./naLink/NavLink";
import {auth, signOut} from "../../lib/auth";

const Links = async () => {
    const links = [
        {
            title: "Homepage",
            path: "/",
        },
        {
            title: "About",
            path: "/about",
        },
        {
            title: "Contact",
            path: "/contact",
        },
        {
            title: "Blog",
            path: "/blog",
        },
    ];

    const session = await auth()
    const isAdmin = false

    const handleGithubLogout = async () => {
        'use server'
        await signOut()
    }

    const renderLogoutUI = () => {
        return session? (
            <form action={handleGithubLogout}>
                <button className={styles.logout}>Logout</button>
            </form>
        ) : <NavLink item={{ title: 'Login', path: '/login' }} />
    }

    const renderAdminPortal = () => {
        return session?.user?.isAdmin && <NavLink item={{ title: 'Admin', path: '/admin' }} />
    }

    return (
        <div className={styles.links}>
            {
                links.map(link => <NavLink item={link} key={link.title}/>)
            }

            { renderAdminPortal() }
            { renderLogoutUI() }

        </div>
    );
};

export default Links;
