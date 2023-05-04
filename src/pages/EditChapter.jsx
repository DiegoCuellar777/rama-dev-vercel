import React, { useRef, useState } from "react"
import axios from "axios"
import apiUrl from '../../api'
import { Link as Anchor } from "react-router-dom"

export default function EditChapter() {
  let [error, setError] = useState()
  let [message, setmessage] = useState()
  let [success, setSuccess] = useState(false)

  let nameManga = useRef()
  let coverPhoto = useRef()
  let order = useRef()
  let pages = useRef()
  let token = localStorage.getItem('token')
  let headers = {headers:{'Authorization':`Bearer ${token}`}}
  function handleForm(e) {
    e.preventDefault()

    let data = {
      title: nameManga.current.value,
      cover_photo: coverPhoto.current.value,
      order: order.current.value,
      pages: pages.current.value.split(',')
    }
    axios.post(apiUrl + 'chapters/chapter-form',data,headers)
      .then(res => {
        console.log(res)
        setSuccess(true)
      })
      .catch(err => {
        console.log(err)
        setError(err)
        const errors = err.response.data.message?.map((text, i) => {
          return <li className=" p-1 font-montserrat not-italic font-normal text-xl leading-4 m-1 text-red-500" key={i}>{text}</li>
        })
        setmessage(errors)
        console.log(err.response.data.message);
      })

  }
  let toggleError = () => {
    setError()
  }

  return (
    <>
      <div className="flex justify-evenly items-center ">
        <div className="w-1/2 h-screen flex flex-col justify-evenly items-center relative">
          <h2 className=" text-white w-[228px] h-[44px] not-italic font-normal text-4xl">New Chapter</h2>
          {error && (<div className="absolute w-[300px] h-48 bg-white flex flex-col justify-center items-center rounded-md">
            <ul className=" mt-3 flex flex-col list-disc ml-[1.5rem]">
              {message}
            </ul>
            <button onClick={toggleError} className="w-[300px] h-12 border-t-2 border-gray-600 flex justify-center items-center mt-auto mb-0 text-blue-700 font-medium" value='closed'>Closed</button>
          </div>)}
          {success && (
            <div className="absolute w-[300px] h-32 bg-white flex flex-col justify-center items-center rounded-md">
              <p className="font-bold text-green-600">Form submitted successfully!</p>
              <div className="mt-auto mb-0 flex flex-wrap justify-center items-center">
                <Anchor to={'/'} className="w-[300px] h-8 border-t-2 border-gray-600  mt-auto mb-0 text-blue-700 font-medium text-center">Return to home</Anchor>
                <button onClick={() => setSuccess(false)} className="w-[300px] h-8 border-t-2 border-gray-600  mt-auto mb-0 text-blue-700 font-medium" value='closed'>create another chapter</button>
              </div>
            </div>
          )}
          <form onSubmit={(e) => handleForm(e)} className="flex flex-col w-[80%] h-[50%] items-center justify-between" action="">
            <input type="text" placeholder="Insert title" ref={nameManga} className="w-[280px] border-b-2 border-[#424242] bg-transparent text-white" />
            <input type="text" placeholder="Insert Url cover photo" ref={coverPhoto} className="w-[280px] border-b-2 border-[#424242] bg-transparent text-white" />
            <input type='text' placeholder="Insert order" ref={order} className="w-[280px] border-b-2 border-[#424242] bg-transparent text-white"></input>
            <input type="text" placeholder="Insert Url pages" ref={pages} className="w-[280px] border-b-2 border-[#424242] bg-transparent text-white"></input>
            <input className="w-[280px] h-[69px] bg-white text-black rounded-md font-bold text-2xl" type="submit" value='Send'></input>
          </form>
        </div>
      </div>
    </>
  )
}
