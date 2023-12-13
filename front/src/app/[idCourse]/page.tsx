import { TvideoClasses } from "@/@types/course";
import { CardVideoAula } from "@/components/CardVideoAula";
import { Header } from "@/components/Header";
import { VerifyLogged } from "@/components/VerifyLogged";
import { BASE_URL, api } from "@/service/api";
import Image from "next/image";

interface PageProps {
  params: { idCourse: string };
}

export default async function Course({ params }: PageProps) {
  const account = VerifyLogged()  
  const response = await fetch(`${BASE_URL}/courses/${params.idCourse}`, { headers: { 'Authorization': `Bearer ${account.token}`, 'Content-Type': 'application/json' } })
  const res = await response.json()

  return (
    <>
      <Header />
      <main className="body">
          <section className="flex flex-col justify-center items-center">
              <div className="w-full md:relative bg-slate-500">
                
                <div className="hidden md:block">
                  <div className="lg:w-[50vw] h-full md:h-[30vh] m-auto flex flex-col justify-center items-center md:items-start md:pl-12 text-white">
                    <h1 className="font-bold text-3xl">{res.name}</h1>
                    <h3>{res.description}</h3>
                  </div>
                </div>
                <div className="lg:h-[23rem] flex flex-col items-center gap-2 p-2 sm:p-10 md:p-2 lg:w-[25rem] md:bg-slate-500 shadow-md md:absolute border-2 md:z-10 md:top-4 md:right-2 xl:right-32 2xl:right-72 xl:md:right-96 text-black">
                  <Image className="w-full h-56" width={0} height={0} src={res.photo} alt="foto do curso"/>
                  <h3 className="text-2xl md:hidden">{res.name}</h3>
                  <h3 className="text-1xl md:hidden">{res.description}</h3>
                  <p className="">Este curso {res.duration} horas</p>
                  <div className="border-t-4 md:border-0 p-4 md:p-0 md:bg-transparent flex justify-center items-center w-[90%] absolute bottom-0 md:relative">
                    <button className="md:w-full p-4 bg-[var(--primary-color)] text-white font-semibold">Matricule-se</button>
                  </div>
                </div>
              </div>
              <ul className="flex flex-col gap-2 w-full h-28 md:w-[35rem] m-auto p-4 border-2">
                {
                  res.videoClasses &&
                  res.videoClasses.map((el: TvideoClasses, i: number) => <CardVideoAula key={i} title={el.title} video={el.video} />)
                }
              </ul>
          </section>
      </main>
    </>
  )
}
