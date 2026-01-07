import React from "react";
import { LogoutBtn, Logo, Container, Button } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status) 
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      url: "/",
      active: true,
    },
    {
      name: "Login",
      url: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      url: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      url: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      url: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <>
      <header className="shadow text-white bg-blue-950">
        <Container>
          <nav className="flex">
            <div className="mt-2">
              <Link to="/">
                <Logo width="70px" />
              </Link>
            </div>
            <ul className="flex ml-auto">
              {
              navItems.map( (item) => 
                item.active ? (
                  <li key={item.name}>
                    <Button
                    onClick={() => {navigate(item.url)}}
                    className = 'inline-bock px-6 py-2 bg-blue-950 duration-200 hover:bg-blue-500 rounded-xl'
                    >
                    {item.name}</Button>
                  </li>
                ) : null )
              } 
              {authStatus && (
                <li>
                  <LogoutBtn/>
                </li>
              )} 
            </ul>
          </nav>
        </Container>
      </header>
    </>
  );
}

export default Header;
