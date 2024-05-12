import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Art from '../pages/Art/Art'
import Favorites from '../pages/Favorites/Favorites'

export default function Rotas() {
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/art/:id' element={<Art/>}/>
            <Route path='/favorites' element={<Favorites/>}/>
        </Routes>
    )
}
