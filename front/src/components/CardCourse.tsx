"use client"

import { Tcourse } from "@/@types/course"
import { loggedAccount } from "@/joatai/account"
import { api } from "@/service/api"
import { getCookie } from "cookies-next"
import { useAtom } from "jotai"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface Iprops {
    courses: Tcourse[]
}

export const CardCourse = ({courses}: Iprops) => {
    const [accountLogged] = useAtom(loggedAccount)
    const [listStudents, setListStudents] = useState<any[]>([])
    const account: undefined | any = getCookie("account")

    const router = useRouter()

    useEffect(() => {
        if(account){  
            const req = async () => {
                const user = JSON.parse(account)
                try {
                    const res = await api.get(`/students`, { headers: { Authorization: `Bearer ${user.token}` } })
                    setListStudents(res.data)
                } catch (error) {
                    console.log(error)
                }
            }
            req()
        }
    }, [])
    if(account){
        courses.map((course) => {
            listStudents.map((el) => {
                if(course.id == el.courseId){
                    course.register = true
                }
            })
        })
    }

    return(
        <>
            {
               accountLogged ?
               courses.map((course, i) => {
                return(
                    <div key={course.id} className="w-full max-w-[25rem]">
                        <Image width={0} height={0} className="w-full h-48" src={course.photo} alt="foto do curso" />
                        <h2 className="font-bold">{course.name}</h2>
                        <p className="font-light" id={String(course.teacher.id)}>{course.teacher.name}</p>
                        {
                            account &&
                            <button onClick={(e) => router.push(`/${e.currentTarget.id}`)} id={String(course.id)} className="p-4 bg-[var(--primary-color)] text-white font-semibold">{ course.register ? "Continuar estudando" : "Matricular-se" }</button>
                        }      
                    </div>       
                )
                })
               :
               courses.map((course) => {
                return(
                    <div key={course.id} className="w-full">
                        <Image width={0} height={0} className="w-full h-48" src={course.photo} alt="foto do curso" />
                        <h2 className="font-bold">{course.name}</h2>
                        <p className="font-light" id={String(course.teacher.id)}>{course.teacher.name}</p>
                        <button onClick={(e) => router.push(`/${e.currentTarget.id}`)} id={String(course.id)} className="p-4 bg-[var(--primary-color)] text-white font-semibold">Ver mais</button>
                    </div>       

                )
                })
            }
        </>
    )
} 