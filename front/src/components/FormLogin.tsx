"use client"

import { Tlogin } from "@/@types/auth"
import { api } from "@/service/api"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { setCookie } from "cookies-next"
import { useAtom } from "jotai"
import { loggedAccount } from "@/joatai/account"

export const FormLogin = () => {
    const [_, setAccountLogged] = useAtom(loggedAccount)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { register, handleSubmit, reset } = useForm<Tlogin>()

    const login = async (data: Tlogin) => {
        setLoading(true)
        try {
            const res = await api.post("/login", data)
            setLoading(false)
            setAccountLogged(true)
            reset()
            setCookie("account", res.data, { maxAge: 60 * 300 })
            router.push("/")
        } catch (error: any) {
            setLoading(false)
            if(error.response.code == 409) console.log("Email inválido")
        }
    }
 
    return(
        <form onSubmit={handleSubmit(login)} className="p-4 w-[25rem] flex flex-col gap-2" method="post">
            <h2 className="text-black font-bold">Inscreva-se e comece a aprender</h2>
           <label className="p-4 border border-black" htmlFor="email">
                <input required {...register("email")} className="bg-transparent outline-none placeholder:text-black font-bold" placeholder="E-mail" type="text" />
           </label>
           <label className="p-4 border border-black" htmlFor="password">
                <input required {...register("password")} className="bbg-transparent outline-none placeholder:text-black font-bold" placeholder="Senha" type="password" />
           </label>
           {
            loading ? 
            <button type="button" className="bg-[var(--primary-color)] p-3 h-12 flex justify-center items-center" disabled>
                <div className="animate-spin h-10 w-3 mr-3 bg-white rounded-full"></div>
            </button>
            :
            <button className="p-3 bg-[var(--primary-color)] text-white font-semibold text-base" disabled={loading ? true : false}>Fazer login</button>
           }

            <div className="mt-6 pt-2 border-t border-gray-400 flex justify-center">
                <p>Ainda não tem uma conta? <Link className="text-blue-600" href="">Inscreva-se</Link></p>
            </div>
        </form>
    )
}