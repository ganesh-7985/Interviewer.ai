'use client';
import { UserButton } from "@clerk/nextjs"
import Image from "next/image"
import { usePathname } from "next/navigation";

function Header() {
    const pathname = usePathname();
  return (
    <div className="flex p-4 justify-between items-center bg-slate-400">
       <Image src={'/logo.svg'} width={160} height={100} alt='logo'/>
       <ul className="hidden md:flex gap-5">
        <li className={` hover:text-violet-500 hover:font-bold transition-all cursor-pointer ${pathname=='/dashboard' && ' text-violet-500 font-bold'}`}>Dashboard</li>
        <li className={` hover:text-violet-500 hover:font-bold transition-all cursor-pointer ${pathname=='/questions' && ' text-violet-500 font-bold'}`}>Questions</li>
        <li className={` hover:text-violet-500 hover:font-bold transition-all cursor-pointer ${pathname=='/works' && ' text-violet-500 font-bold'}`}>How it works?</li>
        <li className={` hover:text-violet-500 hover:font-bold transition-all cursor-pointer ${pathname=='/upgrade' && ' text-violet-500 font-bold'}`}>Upgrade</li>
       </ul>
       <UserButton/>
    </div>
  )
}

export default Header