import { useState, useEffect } from 'react';
import { useRef } from 'react';
import apiUrl from '../../api.js';
import axios from 'axios';
import Nav from '../components/Nav.jsx';
import Swal from 'sweetalert2'

function MangaForm() {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    function fetchData() {
        axios.get(apiUrl + 'categories')
            .then((res) => {
                setCategory(res.data.categories);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    console.log(category)
    let title = useRef(null)
    let cat = useRef(null)
    let description = useRef(null)

    function handleForm(e) {
        e.preventDefault()
        let data = {
            title: title.current.value,
            category_id: cat.current.value,
            description: description.current.value
        }
        console.log(data)
        axios.post(apiUrl + 'mangas', data)
        .then((res) => {
            console.log(res.data)
            Swal.fire({
                title: 'Author successfully created',
                icon: 'success',
                showConfirmButton: true,
                confirmButtonText: 'Go to homepage',
                allowOutsideClick: false,
        })
        }).catch(err => {
            const joi = err.response.data.message
            console.log(err.response.data.message)
            Swal.fire(`${joi}`)
        })
    }
    return (
        <div>
            <Nav />
            <div className="w-full h-screen flex flex-col bg-black items-center justify-center">
                <div className="flex flex-col items-center justify-between p-6 w-full h-[25rem]">
                    <h1 className="text-white font-montserrat text-[1.6rem] font-light">New Manga</h1>
                    <form onSubmit={(e) => handleForm(e)} className="flex flex-col items-center w-[13rem] h-[18rem] justify-around">
                        <div className='flex-col flex w-full gap-5'>
                            <input className="text-white text-[2px] px-[3px] outline-none bg-transparent border-b-[1px] placeholder:font-montserrat placeholder:text-white" ref={title} type="text" name="insert" placeholder="Insert title" id="insertTitle" />
                            <select
                                ref={cat}
                                name="select"
                                className="text-white border-b-[1px] outline-none bg-transparent text-[2px] font-montserrat"
                                id=""
                            >
                                <option className='text-black' disabled value="">Insert category</option>
                                {category.map((cat) => (
                                    <option className='text-black' id={cat._id} value={cat._id} key={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            <input className="text-white text-[2px] px-[3px] outline-none bg-transparent border-b-[1px] placeholder:font-montserrat placeholder:text-white" ref={description} type="text" name="insert" placeholder="insert description" id="insertDescription" />
                        </div>
                        <input className="bg-white w-full h-10 rounded-[4px] font-montserrat font-extrabold" type="submit" value="Send" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default MangaForm

