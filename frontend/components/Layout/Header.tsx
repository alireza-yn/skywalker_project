import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "flowbite-react";
import { Home, LogIn } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";
import Cookies from "js-cookie";
import { Sign } from "crypto";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type Props = {};

const Header = (props: Props) => {
  const [show, setShow] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter()
  useEffect(() => {
    // Check token existence only on the client side
    setIsLoggedIn(!!Cookies.get("token"));
  }, []);

  return (
    <nav className="w-full relative h-20 shadow-md shadow-gray-300 flex items-center justify-start px-10 gap-10">
      <Link href={"/"}>
        <Home />
      </Link>
      <Link
        onMouseEnter={() => setShow(true)}
        href={"/"}
        className="hover:boder-bottom relative border-b-4 border-transparent hover:border-slate-900 transition-all duration-500"
      >
        برنامه نویسم
      </Link>

      <Link
        href={"/"}
        className="hover:boder-bottom border-b-4 border-transparent hover:border-slate-900 transition-all duration-500"
      >
        برنامه نویس شو!
      </Link>
      <div className="flex-1"></div>
      <ThemeToggle />
      {isLoggedIn ? (
        <>
        <Button variant={"ghost"} className="rotate-180" size={"icon"} onClick={()=>{
          Cookies.remove("token")
          router.push('/auth/register')
        }}> <LogIn color="red" /> </Button>
        <Link href={"/user/dashboard"}> داشبورد</Link>
        </>
        
      ) : (
        <>
          <Link
            href={"/auth/login"}
            className="hover:boder-bottom border-b-4 border-transparent hover:border-slate-900 transition-all duration-500"
          >
            ورود
          </Link>
          <Link
            href={"/auth/register"}
            className="hover:boder-bottom border-b-4 border-transparent hover:border-slate-900 transition-all duration-500"
          >
            ثبت نام
          </Link>
        </>
      )}

      <Link
        href={"/new_project"}
        className="border rounded-md w-32 h-10 flex items-center justify-center bg-blue-500 text-background"
      >
        پروژه سریع
      </Link>

      <div
        className={`absolute w-[95vw] top-24 rounded-md ${
          show ? "flex" : "hidden"
        } h-64 border`}
        onMouseLeave={() => setShow(false)}
      >
        <Link href={"/project/amoozeshi"}>پروژه های آموزش</Link>
      </div>
    </nav>
  );
};

export default Header;
