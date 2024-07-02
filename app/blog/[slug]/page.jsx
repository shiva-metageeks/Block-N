'use client'
import PageHero from '../../../components/heros/PageHero'
import { slugify } from '../../../utils/helpers'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import { client } from '../../../sanity/lib/client'
import {} from 

async function getPost(slug) {
  const query = `
    *[_type=="blog" && slug.current=="${slug}"]{
  
    title,
    slug,
    description,
    mainImage,
    category,
    content,
    author,
    date,
    tags,
  } 
  `

  const response = await client.fetch(query)
  console.log(response)
  return response[0]
}
const BlogDetails = () => {
  const [post, setPost] = React.useState(null)
  const pathName = usePathname()
  const slug = pathName.split('/')[2]

  useEffect(() => {
    getPost(slug).then((data) => {
      setPost(data)
    })
  }, [slug])

  return (
    <>
      <PageHero subtitle="BLOG Details" title="Recent blogs created <br/> by aplio" />
      <article className="relative pb-150">
        <div className="absolute -top-[250px] left-1/2 -z-10 h-[550px] w-full -translate-x-1/2  bg-[url('/images/hero-gradient.png')] bg-cover bg-center bg-no-repeat opacity-70 md:hidden"></div>
        <div className="container relative ">
          <div className="absolute left-1/2 top-20 -z-10 flex -translate-x-1/2 -translate-y-1/2 max-md:hidden max-md:-translate-y-0 max-md:flex-col">
            <div className="rounded-full bg-primary-200/20 blur-[145px] max-1xl:h-[335px] max-1xl:w-[335px] 1xl:h-[442px] 1xl:w-[442px]"></div>
            <div className="-ml-[170px] rounded-full bg-primary-200/25 blur-[145px] max-1xl:h-[335px] max-1xl:w-[335px] max-md:ml-0 1xl:h-[442px] 1xl:w-[442px]"></div>
            <div className="-ml-[170px] rounded-full bg-primary-200/20 blur-[145px] max-1xl:h-[335px] max-1xl:w-[335px] max-md:ml-0 1xl:h-[442px] 1xl:w-[442px]"></div>
          </div>

          <div className="mb-16 overflow-hidden rounded-medium bg-white p-2.5 shadow-box dark:bg-dark-200 max-md:h-[400px]">
            <Image
              src={post?.mainImage || ''}
              alt="about images"
              className="w-full rounded  max-md:h-full max-md:object-cover max-md:object-center"
              width={1000}
              height={550}
            />
          </div>
          <div className="blog-details">
            <h2>{post?.title}</h2>
            <div className="mb-12 flex items-center gap-x-2 ">
              <p>{post?.author}</p>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="5" height="6" viewBox="0 0 5 6" fill="none">
                  <circle cx="2.5" cy="3" r="2.5" fill="" className="fill-[#D8DBD0] dark:fill-[#3B3C39]" />
                </svg>
              </span>
              <p>{new Date(post?.date).toDateString()}</p>
            </div>
          </div>
          <div className="blog-details-body">
            <p className="first-para mb-20">{post?.description}</p>
            <div className={richTextStyles}>
              <PortableText value={post?.content} components={myPortableTextComponents} />
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

export default BlogDetails

export const myPortableTextComponents = {
  types: {
    image: ({ value }) => <Image src={urlForImage(value).url()} alt="Post" width={700} height={700} />,
  },
  block: {
    h2: ({ value }) => (
      <h2 id={slugify(value.children[0].text)} className="mb-3 text-3xl font-bold">
        {value.children[0].text}
      </h2>
    ),
    h3: ({ value }) => (
      <h3 id={slugify(value.children[0].text)} className="mb-3 text-2xl font-bold">
        {value.children[0].text}
      </h3>
    ),
    h4: ({ value }) => (
      <h4 id={slugify(value.children[0].text)} className="mb-3 text-2xl font-bold">
        {value.children[0].text}
      </h4>
    ),
    h5: ({ value }) => (
      <h5 id={slugify(value.children[0].text)} className="mb-3 text-2xl font-bold">
        {value.children[0].text}
      </h5>
    ),
    h6: ({ value }) => (
      <h6 id={slugify(value.children[0].text)} className="mb-3 text-xl font-bold">
        {value.children[0].text}
      </h6>
    ),
  },
}

export const richTextStyles = `
mt-14
text-justify
m-auto
prose-headings:my-5
prose-heading:text-2xl
prose-p:mb-5
prose-p:leading-7
prose-li:list-disc
prose-li:leading-7
prose-li:ml-4
`
