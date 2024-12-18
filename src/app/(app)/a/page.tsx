import Link from "next/link"
import ContentWrapper from "@/components/layout/ContentWrapper"

function page() {
  return (
    <ContentWrapper>
      Admin page
      <p>
        <Link href={'/a/list'}>List</Link>
      </p>
      <p>
        <Link href={'/a/upload'}>Upload</Link>
      </p>
    </ContentWrapper>
  )
}

export default page