import { FormRegister } from "@/components/FormRegister";
import { Header } from "@/components/Header";

export default async function Register() {
  
  return (
    <>
      <Header />
      <main className="body">
          <section className="section flex justify-center items-center">
              <FormRegister />
          </section>
      </main>
    </>
  )
}
