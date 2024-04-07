import styles from "./footer.module.css";

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>Max Wong</div>
            <div className={styles.text}>
                Max creative thoughts agency © All rights reserved.
            </div>
        </div>
    );
};

export default Footer;