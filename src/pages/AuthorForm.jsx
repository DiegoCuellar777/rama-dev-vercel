import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import apiUrl from '../../api'
import { useNavigate } from 'react-router-dom';

export default function AuthorForm() {
    let user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate();

    const [$currentDate, setCurrentDate] = useState('');
    const [$photo, setProfileImageUrl] = useState('');
    const name = useRef();
    const last_name = useRef();
    const cityCountry = useRef();
    const date = useRef();
    const photo = useRef();
    console.log(apiUrl)
    useEffect(() => {
        const inputDate = document.querySelector('#date-input');
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        setCurrentDate(new Date().toLocaleDateString('en-GB', options));
        inputDate.value = $currentDate;
    }, []);

    const handleProfileImageChange = (event) => {
        setProfileImageUrl(event.target.value);
    };

    function handleForm(e) {
        e.preventDefault();
        const cityCountryValue = cityCountry.current.value;
        const [city, country] = cityCountryValue.includes(",") ? cityCountryValue.split(",").map(value => value.trim()) : ["", ""];
        let data = {
            name: name.current.value,
            last_name: last_name.current.value,
            city: city.trim(),
            country: country.trim(),
            photo: $photo,
            /* user_id: user.id, */
        };
        let token = localStorage.getItem("token")
        let headers = { headers: { "Authorization": `Bearer ${token}` } }
        axios.post(`${apiUrl}api/authors`, data, headers)
            .then((res) => {
                console.log(res.data)
                Swal.fire({
                    title: 'Author successfully created',
                    icon: 'success',
                    showConfirmButton: true,
                    confirmButtonText: 'Go to homepage',
                    allowOutsideClick: false,
                }).then(() => {
                    const user = JSON.parse(localStorage.getItem("user"));
                    user.photo = $photo; // actualiza la propiedad "photo" del objeto "user"
                    localStorage.setItem("user", JSON.stringify(user)); // guarda el objeto "user" actualizado en el localStorage
                    user.role = 1;
                    localStorage.setItem("user", JSON.stringify(user));
                    navigate('/');
                });
            })
            .catch(err => {
                const joi = err.response.data.message
                console.log(err.response.data.message)
                Swal.fire(`${joi}`)
            })
        console.log(data);
    }

    return (
        <form onSubmit={handleForm} className='h-screen bg-black flex flex-col items-center justify-center'>
            <img
                className="rounded-full object-cover object-center h-16 w-16"
                src={$photo || user.photo}
                alt="user avatar"
            />
            <div className='flex flex-col justify-center w-[50%] sm:w-[30%] text-white font-montserrat font-normal	text-base'>
                <input className='bg-transparent border-b-2 border-white my-4 px-2' type="text" placeholder="Insert name" ref={name} />
                <input className='bg-transparent border-b-2 border-white my-4 px-2' type="text" placeholder="Insert last name" ref={last_name} />
                <input className='bg-transparent border-b-2 border-white my-4 px-2' type="text" placeholder="City, country" ref={cityCountry} />
                <input className='bg-transparent border-b-2 border-white my-4 px-2' type="text" placeholder={$currentDate} readOnly id="date-input" ref={date} />
                <input className='bg-transparent border-b-2 border-white my-4 px-2' type="url" placeholder="URL profile image" onChange={handleProfileImageChange} ref={photo} />
                <button className=" p-2 mb-4 bg-white text-black rounded-md font-bold text-2xl my-4" type="submit">Send</button>
            </div>
        </form>
    );

}
