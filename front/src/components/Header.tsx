"use client"

import Link from 'next/link';
import { IoMenuSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { api } from '@/service/api';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie, deleteCookie } from 'cookies-next';
import { Taccount } from '@/@types/account';
import { SlArrowRight } from 'react-icons/sl';
import { SlLogout } from "react-icons/sl";
import { loggedAccount } from '@/joatai/account';
import { useAtom } from 'jotai';

export const Header = () => {
    const account = getCookie("account")
    const decodedAccount = account && JSON.parse(account)

    const [_, setAccountLogged] = useAtom(loggedAccount)
    const [myAccount, setMyAccount] = useState<Taccount | any>(undefined)
    const [search, setSearch]  = useState('')
    const router = useRouter()

    const openMenu = () => {
        document.querySelector('ul')?.classList.toggle('show')
        document.querySelector('#btn_close')?.classList.toggle('btn_close')
    }

    const openSearch = () => {
        const containerSearch = document.querySelector("#search")
        containerSearch?.classList.toggle('openSearch')
    }

    useEffect(() => {
        if(search){
            const req = async () => {
                try {
                    const res = await api.get(`/courses?name=${search}`)
                    console.log(res)
                } catch (error) {
                    console.log(error)
                }
            }
            req()
        }
    }, [search])

    useEffect(() => {
        if(decodedAccount){
            const req = async () => {
                try {
                    const res = await api.get(`/accounts/${decodedAccount.id}`, { headers: { Authorization: `Bearer ${decodedAccount.token}` } })
                    setMyAccount(res.data)
                } catch (error) {
                    console.log(error)
                }
            }
            req()
        }   
    }, [])
    
    const logout = () => {
        setAccountLogged(false)
        deleteCookie("account")
        setMyAccount(false)
        openMenu()
    }

    const initialName = myAccount && myAccount.name.slice(0, 2).toUpperCase()

    return(
        <>
            <header className='flex py-4 items-center justify-evenly shadow-lg lg:shadow-transparent'>
                <button className='lg:hidden' onClick={openMenu}>
                    <IoMenuSharp size={20} />
               </button>
               <Link href="/" className='font-bold text-3xl text-violet-700'>Kanva</Link>
               <div id='search' className='py-4 lg:p-0 w-full h-full bg-slate-600 lg:w-5/12 lg:bg-transparent fixed z-20 top-0 hidden lg:flex lg:relative'>
                    <div className='w-10/12 m-auto lg:w-full flex border border-black items-center p-2 gap-1 rounded-full'>
                            <FaSearch size={20} />
                            <input onChange={(e) => setSearch(e.currentTarget.value)} className='w-10/12 outline-none px-4 bg-transparent lg:w-11/12' placeholder='Pesquise por um curso' type="text" />
                    </div>
               </div>
               <button onClick={openSearch} className='lg:hidden'>   
                    <FaSearch size={20} />
               </button>
               <nav className='py-6'>
                   <ul className='lg:w-full lg:justify-center lg:items-center flex justify-end fixed top-0 left-0 p-2 w-full h-full z-10 translate-x-[-100%] transition-transform duration-500 ease-in-out bg-slate-400 lg:relative lg:bg-transparent'>
                        <div className='min-w-[15rem] w-6/12 lg:flex lg:justify-center lg:items-center absolute'>
                            {
                                myAccount ? 
                                <div className='flex items-center gap-2 py-2 lg:border-0 border-black'>
                                    <Link href="/account" className='w-20 h-20 bg-black text-white flex justify-center items-center rounded-full font-bold cursor-pointer'>{initialName}</Link>
                                    <Link href="/account" className='lg:hidden cursor-pointer'>
                                        <h5>Olá, {myAccount.name}</h5>
                                        <p>Bem vindo</p>
                                    </Link>
                                    <button className="p-4 rounded-full text-black lg:hidden">
                                        <SlArrowRight />
                                    </button>
                                </div>
                                :
                                <div className='sm:justify-evenly flex items-center justify-between flex-col lg:flex-row gap-1'>
                                    <button className='flex justify-center items-center font-bold p-2 border border-black' onClick={() => router.push("/login")}>Fazer login</button>
                                    <button className='flex justify-center items-center font-bold p-2 border border-black text-white bg-black' onClick={() => router.push("/register")}>Cadastre-se</button>
                                </div>
                            }
                            <div className='lg:hidden flex flex-col gap-2 my-2'>
                                <Link href="">Tecnologia e Software</Link>
                                <Link href="">Finanças</Link>
                                <Link href="">Marketing</Link>
                            {
                                myAccount &&
                                <button onClick={logout} className='flex items-center gap-2 text-red-500'>
                                    <SlLogout />
                                    Sair
                                </button>
                            }
                            </div>   
                            <button id='btn_close' onClick={openMenu} className='hidden lg:hidden absolute top-3 right-[-4.5rem] bg-slate-400 p-5 rounded-full'>
                                <IoMdClose size={20} />
                            </button>
                        </div>
                    </ul>
               </nav>
            </header>
            <div className='hidden lg:flex items-center justify-center gap-10 shadow-lg border-t-[1px] border-slate-300 py-2 text-sm'>
                <Link href="">Tecnologia e Software</Link>
                <Link href="">Finanças</Link>
                <Link href="">Marketing</Link>
            </div>
        </>
    )
}