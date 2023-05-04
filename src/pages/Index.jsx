import React from 'react'
import Presentation from "../components/Presentation"
import Carousel from '../components/Carousel'
import Welcome from '../components/Welcome'

export default function Index() {
    return (
        <main id="Home">
            {<Presentation />}
            <div className="min-h-[100vh] relative md:w-full md:flex md:items-center md:justify-around">
                <Carousel/>
                <Welcome/>
            </div>
        </main>
    )
}
