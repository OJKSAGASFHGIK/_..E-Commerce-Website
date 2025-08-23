import { Dropdown, DropdownItem } from "flowbite-react";
// import { Link } from "react-router-dom";

export default function UserDropdown({ logoutHandler }){
    return(
        <>
            <Dropdown label="User" className="bg-red-600 cursor-pointer" dismissOnClick={false}>
                <DropdownItem>Profile</DropdownItem>
                <DropdownItem onClick={logoutHandler}>Sign Out</DropdownItem>
            </Dropdown>
        </>
    )
}