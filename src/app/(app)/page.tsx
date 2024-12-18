import LogoList from "@/components/Logos/LogoList"
import TagList from "@/components/Tags/TagList"

export default async function Home() {
  return (
    <div className="py-6 md:py-8">
      <TagList />
      <LogoList />
    </div>
  )
}

