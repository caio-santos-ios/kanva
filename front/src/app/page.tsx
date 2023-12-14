import { Header } from "@/components/Header";
import { ListCourse } from "@/components/ListCourse";
import Carousel from "@/components/Carousel";

export const dynamic = "force-dynamic"

export default async function Home() {

  return (
    <>
      <Header />
      <main className="body">
          <section>
           <Carousel />
          </section>
          <section className="section">
            <h1 className="w-full font-bold text-lg">Inscreva-se gratuitamente no melhor do Kanva</h1>
            <p className="w-full font-normal">
              Totalmente gratuito, você tem acesso a muitos dos nossos cursos mais conceituados de tecnologia, negócios, design e muito mais. Experimente grátis.
            </p>
          </section>
          <section className="section">
            <ListCourse />
          </section>
      </main>
    </>
  )
}
