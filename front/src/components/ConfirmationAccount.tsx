"use client"

import { api } from "@/service/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Iprops {
    token: string;
}

export const ConfirmationAccount = ({token}: Iprops) => {
    const [confirmated, setConfirmated] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const req = async () => {
          try {
            const res = await api.patch(`/accounts/${token}`)
            console.log(res)
            setConfirmated(true)
            router.push("/login")
        } catch (error) {
          console.log(error)
        }
      }
      req()
    }, [])

    return(
        <>
            {
                confirmated &&
                <h1 className="text-[var(--primaray-color)] font-bold text-2xl">Conta confirmada</h1>
            }
        </>
    )
}