'use client'

import Link from "next/link";
import styles from './navLink.module.css'
import {usePathname} from "next/navigation";

const NavLink = ({item}) => {
    const pathname = usePathname()

    return (
        <div>
            <Link href={item.path} className={`${styles.container} ${pathname === item.path && styles.active}`}>
                {item.title}
            </Link>
        </div>
    );
};

export default NavLink;
