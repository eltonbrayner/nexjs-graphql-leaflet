import client from 'graphql/client'
import { GetPageBySlugQuery, GetPagesQuery } from 'graphql/generated/graphql'
import { GET_PAGES, GET_PAGES_BY_SLUG } from 'graphql/queries'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/dist/client/router'
import PageTemplate, { PageTemplateProps } from 'templates/Pages'

export default function Page({ heading, body }: PageTemplateProps) {
  const router = useRouter()

  //Retorna um loading, qualquer coisa enquanto está sendo criado a página (renderizado)
  if (router.isFallback) return null

  return <PageTemplate heading={heading} body={body} />
}

//Gerando as urls apenas através dos slugs
export async function getStaticPaths() {
  //retorna do CMS id, heading, slug e body.html
  // {
  //   id: 'ckqdskcvk3tne0b29sb5nv07y',
  //   heading: 'About',
  //   slug: 'about',
  //   body: {
  //     html: '<p>Hey everyone this is my website create with nextjs and graphql</p><p>to contact send msg from email eltonbrayner1@gmail.com</p>'
  //   }
  // }

  //Tipagem gerada através do codegen-graphql que varre os schemas do CMS e devolve as tipagens
  const { pages } = await client.request<GetPagesQuery>(GET_PAGES, { first: 3 })

  //faz um novo array retornando um objeto contendo a propriedade params e dentro apenas o obj slug
  // [
  //   { params: { slug: 'about' } },
  //   { params: { slug: 'terms-of-service' } }
  // ]

  const paths = pages.map(({ slug }) => ({
    params: { slug }
  }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  //Tipagem gerada através do codegen-graphql que varre os schemas do CMS e devolve as tipagens
  const { page } = await client.request<GetPageBySlugQuery>(GET_PAGES_BY_SLUG, {
    slug: `${params?.slug}`
  })

  if (!page) return { notFound: true } //caso não tenha página retorna um 404

  return {
    props: {
      heading: page.heading,
      body: page.body.html
    }
  }
}
//getStaticPaths: Gerar urls das páginas (em build time) /about, /trip/caruaru
//getStaticProps: Busca os dados para a página (props) (em build time - estático)
//getServerSideProps:Busca os dados da página (props) (runtime - toda requisição ele busca - bundlee fica só no server)
//getInitialProps: Serve para buscar dados da página (porps) (runtime - toda requisição ele busca - budlee também vem para o client) - hydrate
