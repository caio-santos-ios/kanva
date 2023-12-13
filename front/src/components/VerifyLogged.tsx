import { getCookie } from "cookies-next"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const VerifyLogged = () => {
    const account: undefined | any = getCookie("account", { cookies })
    if(!account){
        redirect('/login')
    }
    return JSON.parse(account)
}