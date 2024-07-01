'use client'
import PageHero from '@/components/heros/PageHero'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { client } from '../../sanity/lib/client'

const getCaseStudies = async (page, pageSize) => {
  const start = (page - 1) * pageSize
  const end = page * pageSize

  const query = `
    *[_type=="caseStudy"]{

    title,
    slug,
    description,
    mainImage,
    category,
    "totalPosts": count(*[_type=="caseStudy"])
  }[${start}...${end}]
    `

  const response = await client.fetch(query)
  console.log(response)
  return response
}

const Testimonial = () => {
  const [caseStudies, setCaseStudies] = useState([])

  const [page, setPage] = useState(1)
  const totalPosts = caseStudies[0]?.totalPosts
  const pageSize = 6

  const totalPages = Math.ceil(totalPosts / pageSize)

  const setPageNumber = (page) => {
    setPage(page)
  }

  useEffect(() => {
    getCaseStudies(page, pageSize).then((data) => {
      setCaseStudies(data)
    })
  }, [page])
  return (
    <>
      <PageHero
        title="What our customer’s say <br/> about our company"
        paragraph="Until recently, the prevailing view assumed lorem ipsum was born as a nonsense text. It's not Latin, though it looks like it"
      />
      <section className=" relative pb-25">
        <div className="absolute -top-[300px] left-1/2 -z-10 h-[550px] w-full -translate-x-1/2  bg-[url('/images/hero-gradient.png')] bg-cover bg-center bg-no-repeat opacity-70 md:hidden"></div>
        <div className="container relative">
          <div className="relative z-10">
            <div className="absolute left-1/2 top-60 -z-10 flex -translate-x-1/2 -translate-y-1/2 max-md:hidden max-md:flex-col">
              <div className="rounded-full bg-primary-200/20  blur-[145px] max-1xl:h-[335px]  max-1xl:w-[335px] 1xl:h-[442px] 1xl:w-[442px]"></div>
              <div className="-ml-[170px] rounded-full  bg-primary-200/25 blur-[145px]  max-1xl:h-[335px] max-1xl:w-[335px] max-md:ml-0 1xl:h-[442px] 1xl:w-[442px]"></div>
              <div className="-ml-[170px] rounded-full  bg-primary-200/20 blur-[145px]  max-1xl:h-[335px] max-1xl:w-[335px] max-md:ml-0 1xl:h-[442px] 1xl:w-[442px]"></div>
            </div>
            <div className="grid grid-cols-3 gap-8 max-lg:grid-cols-2 max-md:grid-cols-1">
              {caseStudies.map((post, index) => (
                <article key={index} className="rounded-medium bg-white p-2.5 shadow-nav dark:bg-dark-200">
                  <div className="rounded border border-dashed border-gray-100 p-6 dark:border-borderColor-dark max-md:p-4 ">
                    <Image
                      src={post.mainImage || ''}
                      alt={post.title}
                      className="mb-6 w-full rounded-md"
                      width={389}
                      height={189}
                    />
                    <div>
                      <Link href={`/case-studies/${post.slug.current}`} className="badge">
                        {post.category}
                      </Link>
                      <Link href={`/case-studies/${post.slug.current}`} className="block">
                        <h3 className="mb-3 mt-3 font-semibold leading-[1.33]">{post.title}</h3>
                      </Link>

                      <Link href={`/case-studies/${post.slug.current}`}>
                        {post?.description.slice(0, 90)}... <span className="text-blue-500">Read More</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
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

export default Testimonial
