"use client"

import { api } from "@/service/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Iprops {
  params: {token: string}
}

export default async function accountConfirmationToken({params}: Iprops) {
  const router = useRouter()

  useEffect(() => {
    const req = async () => {
      try {
        await api.patch(`/accounts/${params.token}`)
        router.push("/login")
      } catch (error) {
        console.log(error)
      }
    }
    req()
  }, [])

  return (
    <>
      <main className="body">
          <section className="section flex justify-center items-center">
              <h1 className="font-bold text-4xl text-[var(--primary-color)]">Conta confirmada</h1>
          </section>
      </main>
    </>
  )
}
