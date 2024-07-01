'use client'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { sendContactForm } from '@/lib/api'
import { notifyError } from '@/utils/toast'
import ReCAPTCHA from 'react-google-recaptcha'
import { useRouter } from 'next/navigation'

const schema = Yup.object().shape({
  name: Yup.string().required().min(6).label('name'),
  phone: Yup.string().required().min(10).label('phone'),
  email: Yup.string().email().required().label('email'),
  subject: Yup.string().required().min(10).label('subject'),
  message: Yup.string().required().min(50).label('message'),
})

const ContactForm = ({ setPopup, showCloseButton }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  // const router = useRouter()

  const [capValue, setCapValue] = useState()
  const onCaptchaChange = (value) => {
    if (error) setError(false)
    setCapValue(value)
  }
  const onSubmitHandler = async (data) => {
    try {
      setLoading(true)
      await sendContactForm(data)
      setLoading(false)
      reset()
      //   router.push('/thank-you')

      if (setPopup) setPopup(false)
      console.log(setPopup)
    } catch (error) {
      setLoading(false)
      console.log(error)
      notifyError('Error while submitting the form, try later')
    }
  }
  const onSubmitWithCaptchaCheck = (e) => {
    e.preventDefault()

    // Check if captcha is verified
    if (!capValue) {
      setError('Please verify the captcha')
      return
    }

    // If captcha is verified, call handleSubmit
    handleSubmit(onSubmitHandler)(e)
  }

  return (
    <div className="relative rounded-medium bg-white p-2.5 shadow-nav  dark:bg-dark-200">
      <div className=" rounded border border-dashed border-gray-100 bg-white p-12 dark:border-borderColor-dark dark:bg-dark-200 max-md:p-5  ">
        <form onSubmit={onSubmitWithCaptchaCheck}>
          <div className="grid grid-cols-12 max-md:gap-y-10 md:gap-8 md:gap-x-12">
            <div className="max-md:col-span-full md:col-span-6">
              <label
                htmlFor="username"
                className="mb-2 block font-jakarta_sans text-sm font-medium text-paragraph dark:text-white">
                Your name
              </label>
              <input
                type="text"
                {...register('name')}
                placeholder="Name"
                className="block w-full rounded-[48px] border border-borderColor bg-white px-5 py-2.5 text-sm text-paragraph-light outline-none transition-all duration-300 placeholder:text-paragraph-light focus:border-primary dark:border-borderColor-dark dark:bg-dark-200 dark:placeholder:text-paragraph-light dark:focus:border-primary"
              />
              <p style={{ color: '#f56565' }}>{errors.name?.message}</p>
            </div>
            <div className="max-md:col-span-full md:col-span-6">
              <label
                htmlFor="contactno"
                className="mb-2 block font-jakarta_sans text-sm font-medium text-paragraph dark:text-white">
                Contact No.
              </label>
              <input
                type="text"
                {...register('phone')}
                placeholder="+91 9XXXXXXX56"
                className="block w-full rounded-[48px] border border-borderColor bg-white px-5 py-2.5 text-sm text-paragraph-light outline-none transition-all duration-300 placeholder:text-paragraph-light focus:border-primary dark:border-borderColor-dark dark:bg-dark-200 dark:placeholder:text-paragraph-light dark:focus:border-primary"
              />
              <p style={{ color: '#f56565' }}>{errors.phone?.message}</p>
            </div>
            <div className="max-md:col-span-full md:col-span-6">
              <label
                htmlFor="email"
                className="mb-2 block font-jakarta_sans text-sm font-medium text-paragraph dark:text-white">
                Your Email
              </label>
              <input
                type="email"
                {...register('email')}
                placeholder="abc@gmail.com"
                className="block w-full rounded-[48px] border border-borderColor bg-white px-5 py-2.5 text-sm text-paragraph-light   outline-none transition-all duration-300 placeholder:text-paragraph-light focus:border-primary dark:border-borderColor-dark dark:bg-dark-200 dark:focus:border-primary"
              />
              <p style={{ color: '#f56565' }}>{errors.email?.message}</p>
            </div>
            <div className="max-md:col-span-full md:col-span-6">
              <label
                htmlFor="subject"
                className="mb-2 block font-jakarta_sans text-sm font-medium text-paragraph dark:text-white">
                Subject
              </label>
              <input
                placeholder="Write you subject in detail"
                {...register('subject')}
                type="text"
                className="block w-full rounded-[48px] border border-borderColor bg-white px-5 py-2.5 text-sm text-paragraph-light outline-none transition-all duration-300 placeholder:text-paragraph-light focus:border-primary dark:border-borderColor-dark dark:bg-dark-200 dark:placeholder:text-paragraph-light dark:focus:border-primary"
              />
            </div>
            <p style={{ color: '#f56565' }}>{errors.subject?.message}</p>
            <div className="col-span-full">
              <label
                htmlFor="message"
                className="mb-2 block font-jakarta_sans text-sm font-medium text-paragraph dark:text-white">
                Message
              </label>
              <textarea
                {...register('message')}
                defaultValue={''}
                rows={showCloseButton ? '3' : '10'}
                className="block w-full resize-none rounded border border-borderColor bg-white px-5 py-2.5   text-sm text-paragraph-light outline-none transition-all duration-300 placeholder:text-paragraph-light focus:border-primary dark:border-borderColor-dark dark:bg-dark-200 dark:focus:border-primary"></textarea>
              <p style={{ color: '#f56565' }}>{errors.message?.message}</p>
            </div>
            <div className="col-span-full mx-auto text-center">
              <div className="">
                <ReCAPTCHA sitekey={`${process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY}`} onChange={onCaptchaChange} />
                {<p style={{ color: '#f56565' }}>{error}</p>}
              </div>
            </div>
            <div className="col-span-full mx-auto text-center">
              <button disabled={loading} type="submit" className="btn">
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </form>
      </div>
      {showCloseButton ? (
        <button className={'closeButton'} onClick={() => setPopup(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" viewBox="0 0 256 256">
            <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
          </svg>
        </button>
      ) : null}
    </div>
  )
}

export default ContactForm
