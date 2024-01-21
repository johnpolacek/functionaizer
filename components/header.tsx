import Wordmark from "./animation/Wordmark"
import Logo from "./animation/Logo"
import FadeIn from "./animation/FadeIn"

export function Header() {
  return (
    <header className="shrink">
      <Logo />
      <Wordmark />
      <FadeIn delay={3200} animateFromClassname="translate-y-4" className="duration-1000">
        <h2 className="text-lg text-center text-gray-700 font-light mb-8">Create your own custom API and stream structured data with ChatGPT</h2>
      </FadeIn>
    </header>
  )
}
