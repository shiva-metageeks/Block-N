'use client'
import ContactInfo from '@/components/ContactInfo'
import NewsLetter from '@/components/NewsLetter'
import PageHero from '@/components/heros/PageHero'
import { fadeUpAnimation } from '@/data/animation'
import useWhileInView from '@/hooks/useWhileInView'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import ContactForm from '@/components/ContactForm'
import React from 'react'

const page = () => {
  const ref = useRef(null)
  const controlAnimation = useWhileInView(ref)
  return (
    <>
      <PageHero
        subtitle="GET IN TOUCH"
        title="Contact our help desk <br/> for assistance"
        paragraph="Until recently, the prevailing view assumed lorem ipsum was born as a nonsense text. It's not Latin, though it looks like it"
      />
      <ContactInfo />

      <section className="relative mb-150">
        <div className="absolute left-1/2  -z-10 h-[550px] w-full -translate-x-1/2  bg-[url('/images/hero-gradient.png')] bg-cover bg-center bg-no-repeat opacity-70 md:hidden"></div>
        <motion.div
          className="container relative"
          ref={ref}
          initial="initial"
          animate={controlAnimation}
          variants={fadeUpAnimation}>
          <div className="mx-auto mb-12 max-w-[475px] text-center">
            <p className="section-tagline">Contact</p>

            <h2>Let us know how we can assist you</h2>
          </div>
          <div className="relative z-10 mx-auto max-w-[850px]">
            <div className="absolute left-1/2 top-1/2 -z-10 flex -translate-x-1/2 -translate-y-1/2 max-lg:max-w-full max-md:hidden">
              <div className="h-[442px] w-[442px] rounded-full bg-primary-200/20 blur-[145px]"></div>
              <div className="-ml-[170px] h-[442px] w-[442px] rounded-full bg-primary-200/25 blur-[145px]"></div>
              <div className="-ml-[170px] h-[442px] w-[442px] rounded-full bg-primary-200/20 blur-[145px]"></div>
            </div>
            <ContactForm />
          </div>
        </motion.div>
      </section>
      <NewsLetter />
    </>
  )
}

export default page
