// import qbankLogo from "./assets/qbank-logo.webp";
import React, { Fragment, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer/Footer'
import Spinner from './components/Spinner/Spinner'

const CharacterList = React.lazy(
  () => import('./components/CharacterList/CharacterList')
)
const CharacterDetails = React.lazy(
  () => import('./components/CharacterDetails/CharacterDetails')
)

function App() {
  return (
    <Fragment>
      <Suspense
        fallback={
          <div className='position'>
            <Spinner />
          </div>
        }
      >
        <BrowserRouter>
          <Routes>
            <Route
              path='/https://swapi.dev/api/people/:id'
              element={<CharacterDetails />}
            />
            <Route path='/' element={<CharacterList />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
      <Footer />
    </Fragment>
  )
}

export default App
