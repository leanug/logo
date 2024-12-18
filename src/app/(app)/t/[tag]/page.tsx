import LogoList from "@/components/Logos/LogoList"
import TagList from "@/components/Tags/TagList"

function Page() {
  return (
    <section className="py-6 md:py-8">
      <div className="max-w-7xl px-2.5 lg:px-6 mx-auto">
        <TagList />
        <LogoList />
      </div>
    </section>
  )
}

export default Page