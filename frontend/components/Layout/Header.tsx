
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};
import { Navbar } from "flowbite-react";
import { Home } from "lucide-react";
const Header = (props: Props) => {



    return(
      <nav className="w-full h-20 shadow-md shadow-gray-300 flex items-center justify-start px-10 gap-10">
        <Link href={"/"}><Home /></Link>
        <Link href={"/"} className="hover:boder-bottom border-b-4 border-transparent hover:border-slate-900 transition-all duration-500 ">برنامه نویسم</Link>
        <Link href={"/"} className="hover:boder-bottom border-b-4 border-transparent hover:border-slate-900 transition-all duration-500 ">برنامه نویس شو!</Link>
        <div className="flex-1"></div>
        <Link href={"/auth/login"} className="hover:boder-bottom border-b-4 border-transparent hover:border-slate-900 transition-all duration-500 ">ورود</Link>
        <Link href={"/auth/register"} className="hover:boder-bottom border-b-4 border-transparent hover:border-slate-900 transition-all duration-500 ">ثبت نام</Link>
        
        

      </nav>

)
  
};

export default Header;
