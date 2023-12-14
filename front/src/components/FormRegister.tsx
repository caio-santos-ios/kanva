"use client"

import { Tregister } from "@/@types/auth"
import { api } from "@/service/api"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"


export const FormRegister = () => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { register, handleSubmit, reset } = useForm<Tregister>()

    const registion = async (data: Tregister) => {
        setLoading(true)
        try {
            await api.post("/accounts", data)
            router.push("/accountConfirmation")
            reset()
        } catch (error: any) {
            console.log(error.response.status)
            if(error.response.status == 409) toast.error("Email inválido")
            setLoading(false)
        }
    }
 
    return(
        <form onSubmit={handleSubmit(registion)} className="p-4 w-[25rem] flex flex-col gap-2" method="post">
            <h2 className="text-black font-bold">Inscreva-se e comece a aprender</h2>
           <label className="p-4 border border-black" htmlFor="name">
                <input required {...register("name")} className="bg-transparent outline-none placeholder:text-black font-bold" placeholder="Nome completo" type="text" />
           </label>
           <label className="p-4 border border-black" htmlFor="email">
                <input required {...register("email")} className="bg-transparent outline-none placeholder:text-black font-bold" placeholder="E-mail" type="text" />
           </label>
           <label className="p-4 border border-black" htmlFor="password">
                <input required {...register("password")} className="bbg-transparent outline-none placeholder:text-black font-bold" placeholder="Senha" type="password" />
           </label>
           <label className="flex items-center gap-1 text-[var(--primary-color)]" htmlFor="teacher">
                <input {...register("teacher")} type="checkbox" />
                Deseja criar aulas?
           </label>
           {
            loading ? 
            <button type="button" className="bg-[var(--primary-color)] p-3 h-12 flex justify-center items-center" disabled>
                <div className="animate-spin h-10 w-3 mr-3 bg-white rounded-full"></div>
            </button>
            :
            <button className="p-3 bg-[var(--primary-color)] text-white font-semibold text-base">Cadastre-se</button>
           }

            <div className="mt-6 pt-2 border-t border-gray-400 flex justify-center">
                <p>Já tem conta? <Link className="text-blue-600" href="">Faça login</Link></p>
            </div>
        </form>
    )
}