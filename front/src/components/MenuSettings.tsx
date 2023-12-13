"use client"

import { Taccount } from "@/@types/account"
import { loggedAccount } from "@/joatai/account"
import { api } from "@/service/api"
import { deleteCookie, getCookie } from "cookies-next"
import { useAtom } from "jotai"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { SlArrowRight, SlLogout } from "react-icons/sl"

export const MenuSettingsts = ({account}: any) => {
    const [_, setAccountLogged] = useAtom(loggedAccount)
    const [myAccount, setMyAccount] = useState<Taccount | any>(undefined)
    const router = useRouter()

    useEffect(() => {
        const req = async () => {
        try {
                const res = await api.get(`/accounts/${account.id}`, { headers: { Authorization: `Bearer ${account.token}` } })
                setMyAccount(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        req()
    }, [])

    const logout = () => {
        router.push("/")
        setAccountLogged(false)
        deleteCookie("account")
        setMyAccount(undefined)
    }
    const initialName = myAccount && myAccount.name.slice(0, 2).toUpperCase()

    return(
        <ul className="flex flex-col items-center gap-2">
            <div className='flex items-center gap-2 py-2 lg:border-0 border-black'>
                <Link href="/account" className='w-20 h-20 bg-black text-white flex justify-center items-center rounded-full font-bold cursor-pointer'>{initialName}</Link>
                <Link href="/account" className='cursor-pointer'>
                    <h5>Olá, {myAccount && myAccount.name}</h5>
                    <p>Bem vindo</p>
                </Link>
                <button className="p-4 rounded-full text-black lg:hidden">
                    <SlArrowRight />
                </button>
            </div>
            <button onClick={logout} className='flex items-center gap-2 p-4 text-red-500'>
                <SlLogout />
                Sair
            </button>
        </ul>
    )
}