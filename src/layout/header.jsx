import CardNav from "../component/Cardnav";
import logo from "../assets/react.svg";
import { useEffect, useState } from "react";
export function Header({toggleCart}) {
  const [token, setToken] = useState(null)
  useEffect(() => {
    setToken(localStorage.getItem("token"))
  }, [])
  const items = [
    {
      label: "About",
      bgColor: "#00000000",
      textColor: "#fff",
      links: [
        { label: "Company", ariaLabel: "About Company", href: "/" },
        { label: "Careers", ariaLabel: "About Careers" },
      ],
    },
    {
      label: "Account",
      bgColor: "#00000000",
      textColor: "#fff",
      links: !token
        ? [
            { label: "SignIn", ariaLabel: "Login account", href: "/signin" },
            {
              label: " SignUp",
              ariaLabel: "Create account",
              href: "/signup",
            },
          ]
        : [
            { label: "Setting Account", ariaLabel: "Account address, password", href: "/setting" },
          ],
    },
    {
      label: "Contact",
      bgColor: "#00000000",
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email us", href: "rheynoternando@gmail.com" },
        { label: "Github", ariaLabel: "Github", href: "https://github.com/Rezeon" },
        { label: "LinkedIn", ariaLabel: "LinkedIn", href: "https://www.linkedin.com/in/rheyno-fernando-2764062b2/" },
        { label: "WebPorto", ariaLabel: "Web Portofolio", href: "https://rezeon.github.io/Portofolio/" },
      ],
    },
  ];
  return (
    <CardNav
      logo={logo}
      logoAlt="Company Logo"
      items={items}
      toggleCart={toggleCart}
      menuColor="#fff"
      buttonBgColor="#111"
      buttonTextColor="#fff"
      ease="power3.out"
    />
  );
}
