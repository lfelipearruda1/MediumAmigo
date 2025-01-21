import { headers } from "next/headers";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

function Header() {
    return (
        <header>
            <a href="/">MEDIUM</a>
            <div>
                <input type="text" />

            </div>
        </header>
    );
}

export default Header;
e