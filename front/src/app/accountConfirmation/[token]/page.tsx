import { ConfirmationAccount } from "@/components/ConfirmationAccount"

interface Iprops {
  params: {token: string}
}

export default async function Token({params}: Iprops) {

  return (
    <>
      <main className="body">
          <section className="section flex justify-center items-center">
              <ConfirmationAccount token={params.token} />
          </section>
      </main>
    </>
  )
}
