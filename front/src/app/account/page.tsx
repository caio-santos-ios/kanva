import { MenuSettingsts } from "@/components/MenuSettings";
import { VerifyLogged } from "@/components/VerifyLogged";

export default async function Account() {
  const account = VerifyLogged()

  return (
    <>
      <main className="body">
          <section className="section flex justify-center items-center">
             <MenuSettingsts account={account} />
          </section>
      </main>
    </>
  )
}
