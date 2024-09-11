import React from 'react'
import Slider from '../Slider/Slider'
import HomeSearch from './HomeSearch'
import ListingPages from '../ListingPages/ListingPages'
function Home() {
  return (
    <>
     <Slider/>
     <HomeSearch/>

     <ListingPages title="Trending" />
     <ListingPages title="Affordables" />
     <ListingPages title="Super Luxury" />

    </>
  )
}

export default Home
