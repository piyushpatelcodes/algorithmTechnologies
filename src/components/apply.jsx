'use client'

import { useState, useEffect } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Field, Label, Switch } from '@headlessui/react'
import axios from 'axios'
import { SiPaloaltonetworks } from "react-icons/si";


export default function Example() {
  const [agreed, setAgreed] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    domain: '',
    resumelink: '',
    message: '',
  })

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.domain &&
      formData.resumelink &&
      formData.message &&
      agreed
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isFormValid()) {
      try {
        // Replace with your Google Sheets API endpoint
        const response = await axios.post('http://localhost:8080/api/append', formData)
        console.log('Data submitted:', response.data)
        // Reset the form after submission
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          domain: '',
          resumelink: '',
          message: '',
        })
        setAgreed(false)
      } catch (error) {
        console.error('Error submitting data:', error)
      }
    } else {
      console.log('Form is not valid:', formData)
    }
  }

  return (
    <div className="isolate relative bg-white px-6 py-24 sm:py-32 lg:px-8">
      
      
      <div className="mx-auto  max-w-2xl text-center">
      <h2 className="flex flex-wrap items-center justify-center gap-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
      <SiPaloaltonetworks className="text-4xl text-indigo-600" />
      ALGORITHM Technologies Careers
    </h2>        <p className="mt-2 text-lg leading-8 text-gray-600">
          HOLA! Unlock your potential and embark on an exciting journey with us.{' '}
          <span style={{ color: '#FF1493' }}>Apply Now </span>
        </p>
      </div>
      <form onSubmit={handleSubmit}  className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
              First name
            </label>
            <div className="mt-2.5">
              <input
                id="first-name"
                name="firstName"
                type="text"
                autoComplete="given-name"
                value={formData.firstName}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>
          <div>
            <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
              Last name
            </label>
            <div className="mt-2.5">
              <input
                id="last-name"
                name="lastName"
                type="text"
                autoComplete="family-name"
                value={formData.lastName}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>
     
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2.5">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
              Domain
            </label>
            <div className="relative mt-2.5">
            <select
              id="domain"
              name="domain"
              value={formData.domain}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 bg-transparent py-2 pl-3 pr-9 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600"
            >
              <option value="" disabled>Select a domain</option>
              <option value="Ai">Artificial Intelligence</option>
              <option value="web">Full Stack Web Developement</option>
              <option value="py">Python Developer</option>
              <option value="Java">Java Developer</option>

              <option value="ML">Machine Learning</option>
              <option value="datascience">Data Science</option>
              <option value="cpp">C++ Programming</option>
              <option value="uiux">UI/UX designer</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                aria-hidden="true"
              />
            </div>
          </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
              Resume
            </label>
            <div className="mt-2.5">
              <input
                id="resumelink"
                name="resumelink"
                placeholder='Enter Your Resume Google Drive Link Or Any Public Accessible Link'
                type="text"
                autoComplete="family-name"
                value={formData.resumelink}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
            Why You Want to Be a Part of <span style={{color:"#FF1493"}}>ALGORITHM Technologies.</span>
            </label>
            <div className="mt-2.5">
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          </div>
          <Field className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <Switch
                checked={agreed}
                onChange={setAgreed}
                className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 data-[checked]:bg-indigo-600"
              >
                <span className="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  className="h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
                />
              </Switch>
            </div>
            <Label className="text-sm leading-6 text-gray-600">
              By selecting this, you agree to our{' '}
              <a href="#" className="font-semibold text-indigo-600">
                privacy&nbsp;policy
              </a>
              .
            </Label>
          </Field>
        </div>
        <div className="mt-8">
          <button
            type="submit"
            disabled={!isFormValid()}
            className={`block w-full rounded-md px-3.5 py-2 text-sm font-semibold leading-6 text-white ${
              isFormValid()
                ? 'bg-indigo-600 hover:bg-indigo-500'
                : 'bg-gray-400 cursor-not-allowed'
            } shadow-sm ring-1 ring-gray-900/5 transition-colors duration-200 ease-in-out`}
          >
            Submit
          </button>
        </div>
      </form>
      
    </div>
  )
}
