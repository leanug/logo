import LogoList from "@/components/Logos/LogoList"
import TagList from "@/components/Tags/TagList"
import Container from "@/components/Layout/Container"

export default async function Home() {
  return (
    <Container>
      <TagList />
      <LogoList />
    </Container>
  )
}

