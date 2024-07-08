import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import { Form } from 'react-bootstrap'

const API_BASE_URL = "https://api.unsplash.com/search/photos?"
const CLIENT_ID = import.meta.env.VITE_API_KEY

function App() {

  return (
    <div className='container'>
      <h1 className="title">Photo Bucket</h1>

      <div className="search-section">
        <Form onSubmit={handleSearchSubmit}>
          <Form.Control className='search-input' type="search" placeholder='What may we present?' ref={searchControl} />
        </Form>
      </div>

      <div className="recommendation">
        <div onClick={() => handleSelection("europe")}>europe</div>
        <div onClick={() => handleSelection("apartment")}>apartment</div>
        <div onClick={() => handleSelection("computer")}>computer</div>
        <div onClick={() => handleSelection("design")}>design</div>
        <div onClick={() => handleSelection("bodyart")}>bodyart</div>
        <div onClick={() => handleSelection("people")}>people</div>
      </div>

    </div >)
}

export default App
