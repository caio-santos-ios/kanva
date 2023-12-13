"use client"

import { api } from "@/service/api"
import { useEffect, useState } from "react"
import { CardCourse } from "./CardCourse"
import { Tcourse } from "@/@types/course"

interface Iprops {
    course: Tcourse
}

export const ListCourse = () => {
    const [listCourses, setListCourses] = useState<Tcourse[]>([])

    useEffect(() => {
        const req = async () => {
            try {
                const res = await api.get("/courses")
                setListCourses(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        req()
    }, [])
   
    return(
        <>     
            <ul className="grid justify-items-center md:justify-start grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2">
                {
                    listCourses.length > 0 ?
                    <CardCourse courses={listCourses} />
                    :
                    [1, 2, 3, 4, 5].map((el: number) => {
                        return(
                            <div key={el} className="animate-pulse max-w-sm w-full">
                                <div className="border border-slate-700 shadow mx-auto flex flex-col gap-1">
                                    <div className="bg-slate-700 h-48 w-full"></div>
                                    <div className="bg-slate-700 h-4 w-36"></div>
                                    <div className="bg-slate-700 h-4 w-32"></div>
                                    <div className="bg-slate-700 h-14 w-40"></div>
                                </div>    
                            </div>
                        )
                    })
                }
            </ul>
       </>
    )
} 