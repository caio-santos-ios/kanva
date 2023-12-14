import Link from "next/link";

export default async function accountConfirmation() {
  return (
    <>
      <main className="body">
          <section className="section h-[70vh] flex flex-col justify-center items-center gap-10">
              <h1 className="font-bold text-2xl">Clique no link enviado ao seu email, para confirmar sua conta</h1>
              <Link className="p-4 bg-[var(--primary-color)] text-white rounded-md" href="/login">Fazer login</Link>
          </section>
      </main>
    </>
  )
}
