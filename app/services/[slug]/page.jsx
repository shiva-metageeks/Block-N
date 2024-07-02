'use client'
import MembersCounter from '@/components/MembersCounter'
import NewsLetter from '@/components/NewsLetter'
import Pricing from '@/components/Pricing'
import ServiceContent from '@/components/ServiceContent'
import { ServiceData } from '@/data/data'
import { client } from '../../../sanity/lib/client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { FAQData } from '@/data/data'
import FaqItem from '@/components/FaqItem'
import { usePathname } from 'next/navigation'
import SVG from '@/components/FaqSvg/SVG1'
import SVG2 from '@/components/FaqSvg/SVG2'

async function getService(slug) {
  const query = `
 *[_type == "serviceHero" && slug.current == "${slug}"] {
    intoHeading,
    paragraph,
    planHeading,
    heading{
    boldText,
      text
    } ,
    tags,
    slug{
      current
    },
    mainImage{
      asset->{
        _id,
        url
      }
    },
    mainImageAlt,
    faqImage{
      asset->{
        _id,
        url
      }
    },
    faqImageAlt,
    faq[] {
      question,
      answer
    },
    serviceProcess->{
      subheading,
      heading {
        boldText,
        text
      },
      extraText,
      process[] {
        heading,
        description,
        icon
      }
    },
    serviceFeature->{
      subheading,
      heading {
        boldText,
        text
      },
      extraText,
      process[] {
        heading,
        description,
        icon
      }
    },
    serviceTechStack->{
      subheading,
      heading,
      techStack[] {
        heading,
        icon
      }
    }
  }
  `

  const response = await client.fetch(query, { cache: 'no-store' })
  // console.log(response);
  return response[0]
}

const ServiceDetails = () => {
  const pathName = usePathname()
  const slug = pathName.split('/')[2]
  const [service, setService] = useState(null)
  const [generalFaq, setGeneralFaq] = useState(FAQData)

  useEffect(() => {
    getService(slug).then((data) => {
      setService(data)
      setGeneralFaq(data.faq)
    })
  }, [slug])

  const [activeIndex, setActiveIndex] = useState(null)

  const handleItemClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index))
  }

  return (
    <>
      {/* <ServiceContent data={data} /> */}
      <section className="relative pb-150 pt-[200px] max-md:overflow-hidden max-md:pb-20 max-md:pt-25">
        <div className="absolute -top-8 left-0 right-0 h-full w-full bg-[url('/images/service-bg.png')] bg-cover bg-center bg-no-repeat opacity-70 sm:hidden"></div>
        <div className="container relative z-10">
          <div className="absolute left-1/2 top-52 -z-10 flex -translate-x-1/2 max-md:hidden max-md:flex-col">
            <div className="rounded-full bg-primary-200/20 blur-[145px] lg:h-[330px] lg:w-[330px] xl:h-[442px] xl:w-[442px] "></div>
            <div className="rounded-full bg-primary-200/25 blur-[145px] lg:-ml-[170px] lg:h-[330px] lg:w-[330px] xl:h-[442px] xl:w-[442px]"></div>
            <div className="lg-ml-[170px] rounded-full bg-primary-200/20 blur-[145px] lg:h-[330px] lg:w-[330px] xl:h-[442px] xl:w-[442px]"></div>
          </div>

          <div className="grid auto-rows-max grid-cols-12 gap-y-15 md:gap-8 lg:gap-16"></div>
          <div className="relative mx-auto w-[80%] max-md:col-span-full md:col-span-6 lg:col-span-8">
            <div className="singlePage relative  max-md:mt-20">
              <h3 className="my-5 text-center">{service?.planHeading}</h3>
              <div className="rounded-medium bg-white p-2.5 shadow-nav dark:bg-dark-200">
                <Image
                  // src={service.mainImage}
                  src={''}
                  alt="service images"
                  className="w-full rounded"
                  width={788}
                  height={450}
                />
              </div>
              <p>{service?.paragraph}</p>
              <div className="flex justify-between max-md:flex-col">
                <div>
                  <h3>Service Process</h3>
                  <p>{service?.serviceProcess?.heading.boldText + service?.serviceProcess?.heading.text}</p>
                  <ul>
                    {service?.serviceProcess.process &&
                      service?.serviceProcess.process.map((items, index) => <li key={index}> {items.heading} </li>)}
                  </ul>
                </div>
                <div>
                  <h3>Service Feature</h3>
                  <p>{service?.serviceFeature.heading.boldText + service?.serviceFeature.heading.text}</p>
                  <ul>
                    {service?.serviceFeature?.process &&
                      service?.serviceFeature?.process?.map((items, index) => <li key={index}> {items.heading} </li>)}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <h3 className="my-10">Tech Stack</h3>
          <div className="row g-4 mb-20 flex justify-between">
            {service?.serviceTechStack?.techStack?.map((tool, index) => (
              <div
                key={index}
                className="col-lg-3 col-md-4 col-sm-6 wow animate fadeInDown"
                data-wow-delay="200ms"
                data-wow-duration="1500ms">
                <div className="tools-card flex items-center gap-2">
                  <div className="tools-icon">
                    <img src={tool.icon} alt="" style={{ width: '22px' }} />
                  </div>
                  <div className="tools-name">
                    <span> {tool.heading} </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <section className=" relative overflow-hidden  pb-[130px]   max-md:py-20">
            {/* <div className="absolute left-1/2 top-0 max-w-[1612px] -translate-x-1/2">
              <SVG />
            </div>
            <div className="absolute bottom-0 left-0 w-full">
              <SVG2 />
            </div> */}

            <div className="container relative z-10">
              <div className="grid grid-cols-2 gap-10 max-lg:grid-cols-1 1xl:gap-x-24 ">
                <div>
                  <p className="section-tagline">Faq&rsquo;s</p>

                  <h2 className="mb-8">
                    Frequently Asked <br />
                    Question about Service
                  </h2>
                  <p>
                    Neque accumsan dolor nullam commodo. Odio massa nisi ullamcorper suspendisse amet amet. Aenean
                    suspendisse eget est pulvinar. Fames eget eget nascetur ornare
                  </p>
                </div>
                <div className="[&>*:not(:last-child)]:mb-5">
                  {generalFaq.map((faq, index) => (
                    <FaqItem
                      key={faq.id}
                      question={faq.question}
                      answer={faq.answer}
                      isOpen={activeIndex === index}
                      onClick={() => handleItemClick(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  )
}

export default ServiceDetails
