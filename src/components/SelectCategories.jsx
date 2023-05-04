import { useState, useEffect } from 'react';
import axios from 'axios'
import apiUrl from '../../api';

function SelectCategories() {
    async function fetchData() {
        try {
            const response = await axios.get(apiUrl + 'categories');
            const data = response.data.categories;
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <select onClick={fetchData} name="select" className="text-white bg-black border-b-[1px] outline-none bg-transparent text-[2px] font-montserrat" id="">
            <option className='w-full text-black' value="">Insert category</option>
            <option className='w-full text-black' value="">Insert category</option>
            <option className='w-full text-black' value="">Insert category</option>
        </select>
    )
}

export default SelectCategories

/*     const [category, setCategory] = useState([])

    const fetchData = () => {
        return axios.get(apiUrl + "categories")
            .then((res) => setCategory(res.data.categories))
    }
    useEffect(() => {
        fetchData()

    }, []) */

