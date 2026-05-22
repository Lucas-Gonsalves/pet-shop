import { Logo } from '../logo'

export const Header = () => {
  return (
    <header className="bg-background/95 supports-backdrop-filter:bg-background/60 fixed top-0 z-50 w-full backdrop-blur">
      <Logo />
    </header>
  )
}
