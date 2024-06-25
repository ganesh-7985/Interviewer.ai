'use client';
import { UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link";
import { usePathname } from "next/navigation";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

 const Header = () => {
  return (
    <div className="py-10">
      <SlideTabs />
    </div>
  );
};

const SlideTabs = () => {
  const pathname = usePathname();
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="relative mx-auto  w-fit rounded-full border-2 border-black bg-slate-800 p-1 flex justify-between items-center"
    >
      <Tab setPosition={setPosition}>
     <div className="flex gap-1 ">
     <Image src={'/logo.svg'} width={30} height={30} alt='logo' />
        <h1 className="text-primary-light font-serif text-md">Interviewer.ai</h1>
     </div>
      </Tab>
      <Tab setPosition={setPosition}><Link href={'/dashboard'}> <div className={`text-white hover:text-primary hover:font-bold transition-all  cursor-pointer ${pathname=='/dashboard'&&' text-primary font-extrabold'}`}>Dashboard</div></Link></Tab>
      <Tab setPosition={setPosition}>
      <div className='pt-1'>
      <UserButton/>
      </div>

      </Tab>

      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({ children, setPosition }) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full bg-black md:h-12"
    />
  );
};

export default Header;