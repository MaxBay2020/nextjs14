
import Image from "next/image";
import styles from "./page.module.css";
// import dynamic from "next/dynamic";
// import HydrationTest from "@/components/hydrationTest";

// const HydrationTestNoSSR = dynamic(()=>import("@/components/hydrationTest"), {ssr: false})

// export const metadata = {
//     title: "Contact Page",
//     description: "Contact description",
// };

export const metadata = {
    title: 'Contact',
    description: 'Contact description',
}

const ContactPage = () => {

    return (
        <div suppressHydrationWarning={true}>
            contact
        </div>
    );
};

export default ContactPage;