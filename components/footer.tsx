import FadeIn from "./animation/FadeIn"

export function Footer() {
  return (
    <footer className="flex justify-center font-mono">
      <FadeIn delay={5000} className="p-12 border-t text-center w-full lg:w-1/2 opacity-70 duration-1000">
        Created by John Polacek
      </FadeIn>
    </footer>
  )
}
