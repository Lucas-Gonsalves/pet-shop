import { DogIcon } from 'lucide-react'
import Link from 'next/link'

export const Logo = () => {
  return (
    <Link href="/" className="flex w-fit items-center gap-4 rounded-b-lg bg-[#2E2C30] p-2">
      <div className="bg-background-brand flex h-8 w-8 items-center justify-center rounded">
        <DogIcon />
      </div>
      <span className="text-lable-large-size text-content-brand font-bold">PET WORLD</span>
    </Link>
  )
}
