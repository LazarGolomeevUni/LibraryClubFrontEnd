import Navbar from "../navbar/navbar";

const navigation = {
    brand: { name: "Home", to: "/" },
    links: [
        { name: "Home", to: "/" },
        {name: "Create", to: "/create"},
        // { name: "Room Control", to: "/roomcontrol" },
        // { name: "Manage Users and Permissions", to: "/management" },
        { name: "About", to: "/about" },
        { name: "Help", to: "/help" },

    ]
}
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}
const Layout = ({ children }: Props) => {

    const { brand, links } = navigation;
    return (
        <>
            <Navbar brand={brand} links={links} />
            <div>{children}</div>
        </>
    );
};
export default Layout;