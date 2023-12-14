import { FormLogin } from "@/components/FormLogin";
import { Header } from "@/components/Header";

export default async function Login() {
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
