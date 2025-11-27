"use client";

import HumbergerMenu from "@/features/navbar/HamburgerMenu";
import MenuItems from "@/features/navbar/MenuItems";
import Image from "next/image";
import Button from "./Button";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { CircleUserRound } from "lucide-react";
import { clearData, setToken, setUser } from "@/store/userDataSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Profile from "@/features/navbar/Profile";
import { getUser, logoutUser } from "@/features/lib/api/UserApi";
import { alertSuccess } from "@/features/lib/alert";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.userData.data.token);
  const username = useAppSelector((state) => state.userData.data.username);
  const name = useAppSelector((state) => state.userData.data.name);
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Jika scroll ke bawah dan melewati 50px, sembunyikan navbar
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      lastScrollY.current = currentScrollY;

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setShowNavbar(true);
      }, 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  useEffect(() => {
    const fetchGetUser = async (token: string) => {
      const response = await getUser(token);
      const responseBody = await response.json();
      dispatch(
        setUser({
          username: responseBody.data.username,
          name: responseBody.data.name,
        })
      );
    };
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      dispatch(setToken(storedToken || ""));
      if (token) {
        fetchGetUser(token);
      }
    }
  }, [token, dispatch]);

  const handleLogout = async () => {
    const response = await logoutUser(token);
    const responseBody = await response.json();
    localStorage.removeItem("token");
    dispatch(clearData());
    setProfileOpen(false);
    await alertSuccess(responseBody.data);
    router.push("/");
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileOpen]);

  return (
    <>
      <AnimatePresence>
        <motion.nav
          initial={{ y: 0 }}
          animate={{ y: showNavbar ? 0 : -100, opacity: showNavbar ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={`fixed top-0 left-0 w-full ${
            isOpen ? "bg-white" : "bg-white/50 backdrop-blur-sm"
          } shadow-lg h-22 grid items-center grid-cols-3 px-4 py-2 z-[9999]`}
        >
          <div className="logo-btv font-bold text-white text-xl order-2 lg:order-1 lg:justify-start flex items-center gap-2 justify-center">
            <Image src="/images/logo.png" alt="logo" width={52} height={52} />
            <div className="text-blue-900 font-bold flex-col text-sm hidden lg:flex">
              <h1>BangSya TV</h1>
              <h1 className="font-medium">Contact Web</h1>
            </div>
          </div>
          <div className="menu order-1 lg:order-2 justify-start lg:justify-center">
            <div className="flex flex-col lg:flex justify-center">
              <MenuItems isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
            <div className="hamburger lg:hidden">
              <HumbergerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
          </div>
          <div className="icon order-3 flex gap-2 justify-end">
            <div className="signup flex items-center justify-center gap-1">
              <Link href="/signup" className={`${token ? "hidden" : ""}`}>
                <Button className="text-blue-950 bg-slate-200 hover:ring-3 hover:ring-slate-100 hover:opacity-75 hidden md:flex hover:bg-slate-200 hover:shadow-xl">
                  Sign Up
                </Button>
              </Link>
              <Link href="/" className={`${token ? "hidden" : ""}`}>
                <Button className="text-white hover:ring-3 hover:ring-blue-200 ">
                  Sign In
                </Button>
              </Link>
              {token && (
                <div ref={buttonRef}>
                  <CircleUserRound
                    size={33}
                    className="text-blue-900 cursor-pointer"
                    onClick={() => setProfileOpen(!profileOpen)}
                  />
                </div>
              )}
              <AnimatePresence>
                {profileOpen && (
                  <>
                    <Profile
                      handleClose={() => setProfileOpen(false)}
                      username={username}
                      name={name}
                      onLogout={() => handleLogout()}
                      ref={modalRef}
                    />
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.nav>
      </AnimatePresence>

      <div
        className={`fixed inset-0 bg-black z-40 lg:hidden transition-opacity duration-300
        ${isOpen ? "opacity-40" : "hidden"}`}
      ></div>
    </>
  );
}
