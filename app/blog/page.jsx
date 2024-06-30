'use client'

import PageHero from '@/components/heros/PageHero'
import { client } from '../../sanity/lib/client'
import { useEffect, useState } from 'react'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

const getPost = async (page, pageSize, searchTerm = '') => {
  const start = (page - 1) * pageSize
  const end = page * pageSize

  // Escape special characters in the search term to prevent GROQ injection
  const escapedSearchTerm = searchTerm.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')

  const query = `
    *[_type == "blog" && (
      title match "${escapedSearchTerm}*" ||
      "${escapedSearchTerm}" in tags
    )]{
      title,
      slug,
      description,
      mainImage {
        asset->{
          _id,
          url
        }
      },
      category,
      date,
      tags,
      "totalPosts": count(*[_type == "blog" && (
        title match "${escapedSearchTerm}*" ||
        "${escapedSearchTerm}" in tags
      )])
    }[${start}...${end}]
  `

  const response = await client.fetch(query)
  console.log(response)
  return response
}

const Blog = () => {
  // const blogs = getMarkDownData('data/blogs')

  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const totalPosts = posts[0]?.totalPosts
  const pageSize = 3
  const totalPages = Math.ceil(totalPosts / pageSize)

  const setPageNumber = (page) => {
    setPage(page)
  }
  const handleNextPage = () => {
    console.log(page, totalPages)
    if (totalPages > page) setPage((prev) => prev + 1)
  }

  const fetchData = async (value) => {
    const response = await getPost(page, pageSize, value ? value : '')
    setPosts(response)
  }

  useEffect(() => {
    fetchData()
  }, [page])
  return (
    <>
      <PageHero subtitle="BLOG GRID" title="Recent blogs created <br/> by aplio" />
      {/* <BlogFeatures featureBlog={blogs} /> */}
      {/* <BlogGrid blogItemData={blogs} /> */}
      <section className="relative py-150 max-md:py-20">
        <div className="absolute left-1/2 top-20 -z-10 h-[550px] w-full -translate-x-1/2  bg-[url('/images/hero-gradient.png')] bg-cover bg-center bg-no-repeat opacity-70 md:hidden"></div>
        <div className="container relative mb-16">
          <div className="mx-auto mb-16 max-w-[550px] text-center">
            <p className="section-tagline">Tips and Tricks</p>
            <h2>Our recent news & insights</h2>
          </div>
          <div className="relative z-10">
            <div className="absolute left-1/2 top-60 -z-10 flex -translate-x-1/2 -translate-y-1/2 max-md:hidden max-md:flex-col">
              <div className="rounded-full bg-primary-200/20  blur-[145px] max-1xl:h-[335px]  max-1xl:w-[335px] 1xl:h-[442px] 1xl:w-[442px]"></div>
              <div className="-ml-[170px] rounded-full  bg-primary-200/25 blur-[145px]  max-1xl:h-[335px] max-1xl:w-[335px] max-md:ml-0 1xl:h-[442px] 1xl:w-[442px]"></div>
              <div className="-ml-[170px] rounded-full  bg-primary-200/20 blur-[145px]  max-1xl:h-[335px] max-1xl:w-[335px] max-md:ml-0 1xl:h-[442px] 1xl:w-[442px]"></div>
            </div>
            <div className="grid grid-cols-3 gap-8 max-lg:grid-cols-2 max-md:grid-cols-1">
              {posts.map((post) => (
                <article className="rounded-medium bg-white p-2.5 shadow-nav dark:bg-dark-200">
                  <div className="rounded border border-dashed border-gray-100 p-6 dark:border-borderColor-dark max-md:p-4 ">
                    <Image
                      src={post?.mainImage || ''}
                      alt="service logo"
                      className="mb-6 w-full rounded-md"
                      width={389}
                      height={189}
                    />
                    <div>
                      <Link href={`/blog/${post.slug.current}`} className="badge">
                        {blogData?.tags || 'tag'}
                      </Link>
                      <Link href={`/blog/${post.slug.current}`} className="block">
                        <h3 className="mb-3 font-semibold leading-[1.33]">{post.title}</h3>
                      </Link>
                      <div className="mb-4 flex items-center gap-x-2 ">
                        <p>{post.author}</p>
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="5" height="6" viewBox="0 0 5 6" fill="none">
                            <circle cx="2.5" cy="3" r="2.5" fill="" className="fill-[#D8DBD0] dark:fill-[#3B3C39]" />
                          </svg>
                        </span>
                        <p>{new Date(post?.date).toDateString()}</p>
                      </div>
                      {/* <ReactMarkdown>{content.slice(0, 70)}</ReactMarkdown> */}
                      {/* <p>{pocontent.slice(0, 70)}</p> */}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
        {/* <Pagination paginateFunction={paginateFunction} /> */}
        <div className="container">
          <ul className="flex items-center justify-center gap-2">
            <li className="group">
              <button
                onClick={() => {
                  setPageNumber(page - 1)
                }}
                className={`group flex h-10 w-10 items-center justify-center rounded-full border border-borderColor  text-sm  font-medium duration-300 dark:border-borderColor-dark ${
                  page === 1 ? 'disabled:opacity-7 cursor-not-allowed' : 'cursor-pointer hover:bg-primary'
                }`}
                disabled={page === 1}>
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className={`${page === 1 ? '' : 'dark:group-hover:text-paragraph'}  duration-300`}
                />
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li className={`group ${index + 1 === page && 'page-active'}`} key={index}>
                <button
                  href=""
                  className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium duration-300 hover:bg-primary  hover:text-paragraph group-[.page-active]:bg-primary dark:group-[.page-active]:text-paragraph"
                  onClick={() => setPageNumber(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}

            <li className="group">
              <button
                onClick={() => {
                  setPageNumber(page + 1)
                }}
                className={`group flex h-10 w-10 items-center justify-center rounded-full border border-borderColor  text-sm  font-medium duration-300 dark:border-borderColor-dark  ${
                  page === totalPages ? 'disabled:opacity-7 cursor-not-allowed' : 'cursor-pointer hover:bg-primary'
                }`}
                disabled={page === totalPages}>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className={`${page === totalPages ? '' : 'dark:group-hover:text-paragraph'}  duration-300`}
                />
              </button>
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}

export default Blog
