import LogoList from "@/components/Logos/LogoList"
import TagList from "@/components/Tags/TagList"
import Container from "@/components/Layout/Container"

function Page() {
  return (
    <Container>
      <TagList />
      <LogoList />
    </Container>
  )
}

export default Page