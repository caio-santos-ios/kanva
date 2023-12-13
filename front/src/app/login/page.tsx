import { FormLogin } from "@/components/FormLogin";
import { Header } from "@/components/Header";
import { VerifyLogged } from "@/components/VerifyLogged";
import { getCookie } from "cookies-next"

export default async function Login() {
  const account: undefined | any = getCookie("account")
  //const myAccount = JSON.parse(account)
  console.log(account)  
  return (
    <>
      <Header />
      <main className="body">
          <section className="section flex justify-center items-center">
              <FormLogin />
          </section>
      </main>
    </>
  )
}
