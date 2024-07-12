import { FormEvent, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import { Form } from 'react-bootstrap'
import axios from 'axios'
import Nav from './components/Nav'
import Recommender from './components/Recommender'

const API_BASE_URL = "https://api.unsplash.com/search/photos?"
const CLIENT_ID = import.meta.env.VITE_API_KEY

type SearchResultWithMetadataType = {
  searchedPhotos: Random[]
  totalPhotoCount: number
  numberOfPages: number
}

function App() {
  const searchControl = useRef<HTMLInputElement>(null!)

  const [currentPagePointer, setCurrentPagePointer] = useState(0)
  const [searchResultWithMetadata, setSearchResultWithMetadata] = useState({} as SearchResultWithMetadataType)
  const [errorMessage, setErrorMessage] = useState('')

  const getPhotos = async () => {
    try {
      if (searchControl.current.value.trim()) {
        setErrorMessage('')

        const { data } = await axios.get(
          `${API_BASE_URL}query=${searchControl.current.value.trim()}
      &client_id=${CLIENT_ID}&page=${currentPagePointer}&per_page=12`
        )
        setSearchResultWithMetadata({
          searchedPhotos: data.results,
          totalPhotoCount: data.total,
          numberOfPages: data.total_pages
        })
      }
    } catch (error) {
      setCurrentPagePointer(0)
      setErrorMessage("No photos found. Please try with different search parameters.")

      console.log(error)
    }
  }


    const loadResults = () => {
      if ("" == errorMessage) {
        setCurrentPagePointer(1)
        getPhotos()
      }
    }
    const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      loadResults()
    }
  
  const handleSelection = (recommendation: string) => {
    searchControl.current.value = recommendation.trim()
    const oldPagePointer = currentPagePointer
    if (1 == oldPagePointer) getPhotos()
    else if ("" == errorMessage) setCurrentPagePointer(1)
  }

  return (
    <div className='container'>
      <h1 className="title">Photo Bucket</h1>

      <div className="search-section">
        <Form onSubmit={handleSearchSubmit}>
          <Form.Control className='search-input' type="search" placeholder='What may we present?' ref={searchControl} />
        </Form>
      </div>

      <Recommender handleSelection={handleSelection} />

      <div className="photos-results">
        {errorMessage ? <h4>{errorMessage}</h4> :
          <>
            <div className="result-summary">
              {(0 != searchResultWithMetadata.totalPhotoCount) ? searchResultWithMetadata.totalPhotoCount : ""} Photos for you, from the world, of the universe!
            </div>
            {
              searchResultWithMetadata.searchedPhotos?.map(photo => {
                return photo && (<a href={photo.urls.regular} target='_blank' key={photo.id}>
                  <img src={photo.urls.thumb} alt="photo.alt_description" className='image'></img>
                </a>)
              }
              )}
          </>}
      </div>

      {
        0 != searchResultWithMetadata.totalPhotoCount && <Nav key={currentPagePointer} pageNumber={currentPagePointer} pageNumberUpdater={setCurrentPagePointer} totalPages={searchResultWithMetadata.numberOfPages} />
      }   

    </div >)
}

export default App
