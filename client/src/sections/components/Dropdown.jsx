import { Dropdown, DropdownItem } from "flowbite-react";
import { Link } from "react-router-dom";

export default function UserDropdown({ logoutHandler }){
    return(
        <>
            <Dropdown label="User" className="text-white bg-red-600 cursor-pointer" dismissOnClick={false}>
                <Link to="/order-history">
                    <DropdownItem className="text-white hover:bg-red-700">Order History</DropdownItem>
                </Link>
                <DropdownItem className="text-white hover:bg-red-700" onClick={logoutHandler}>Sign Out</DropdownItem>
            </Dropdown>
        </>
    )
}