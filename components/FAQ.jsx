'use client'
import React, { useState } from 'react'
import { FAQData } from '@/data/data'
import FaqItem from './FaqItem'
import SVG from '@/components/FaqSvg/SVG1'
import SVG2 from '@/components/FaqSvg/SVG2'

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const handleItemClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index))
  }
  const generalFaq = FAQData.filter((faq) => faq.type.includes('general'))

  return (
    <section className=" relative overflow-hidden bg-gray pb-[130px] pt-150 dark:bg-dark max-md:py-20">
      <div className="absolute left-1/2 top-0 max-w-[1612px] -translate-x-1/2">
        <SVG />
      </div>
      <div className="absolute bottom-0 left-0 w-full">
        <SVG2 />
      </div>
      <div className="container relative z-10">
        <div className="grid grid-cols-2 gap-10 max-lg:grid-cols-1 1xl:gap-x-24 ">
          <div>
            <p className="section-tagline">Faq&rsquo;s</p>

            <h2 className="mb-8">
              Frequently Asked <br />
              Question
            </h2>
            <p>
              Neque accumsan dolor nullam commodo. Odio massa nisi ullamcorper suspendisse amet amet. Aenean suspendisse
              eget est pulvinar. Fames eget eget nascetur ornare
            </p>
          </div>
          <div className="[&>*:not(:last-child)]:mb-5">
            {generalFaq.map((faq) => (
              <FaqItem
                key={faq.id}
                question={faq.question}
                answer={faq.answer}
                isOpen={activeIndex === faq.id}
                onClick={() => handleItemClick(faq.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ
