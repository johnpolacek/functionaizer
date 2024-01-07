import { Functionaizer } from "./functionaizer"

export function Home() {
  return (
    <main className="container min-h-screen flex flex-col justify-center mx-auto pt-8 pb-16">
      <h1 className="text-6xl text-center font-bold mb-4">Functionaizer</h1>
      <h1 className="text-xl text-center font-semibold mb-16">Create your own custom API that streams structured data from ChatGPT</h1>
      <Functionaizer />
    </main>
  )
}
