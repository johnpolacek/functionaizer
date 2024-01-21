import { Functionaizer } from "./functionaizer"
import { Header } from "./header"
import { Footer } from "./footer"

export function Home() {
  return (
    <div className="container min-h-screen flex flex-col justify-between mx-auto pt-8">
      <Header />
      <main className="flex items-center grow pb-16">
        <Functionaizer />
      </main>
      <Footer />
    </div>
  )
}
