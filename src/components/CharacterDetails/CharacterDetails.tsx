import { useState, useEffect } from 'react'
import './CharacterDetailsStyle.css'
import Spinner from '../Spinner/Spinner'
import { useParams } from 'react-router-dom'
import Character from '../../Type/type'
import HeadingText from '../HeadingText/HeadingText'
import { getId } from '../../common'

const CharacterDetails = () => {
  const [details, setDetails] = useState<Character | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const params = useParams<{ id: string }>()

  const getCharacterDetail = () => {
    setIsLoading(true)
    fetch(`https://swapi.dev/api/people/${params.id}`)
      .then((response) => response.json())
      .then((res: Character) => {
        setDetails(res)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    getCharacterDetail()
  }, [])

  if (isLoading) {
    return (
      <div className='position'>
        <Spinner />
      </div>
    )
  }

  if (!details) return null

  return (
    <>
      <HeadingText text={`Details about ${details?.name} `} />
      <div className='details-container'>
        <div className='poster-container'>
          <img
            src={`https://picsum.photos/id/${getId(details?.url)}/200/300`}
            alt='avatar'
          />
        </div>
        <div className='text-container'>
          <div className='character-details'>
            <p>
              <span className='character-details-span-left'>Name: </span>
              <span>{details?.name}</span>
            </p>
            <p>
              <span className='character-details-span-left'>Height: </span>
              <span>{details?.height}</span>
            </p>
            <p>
              <span className='character-details-span-left'>Hair Color: </span>
              <span>{details?.hair_color}</span>
            </p>
            <p>
              <span className='character-details-span-left'>Eye Color: </span>
              <span>{details?.eye_color}</span>
            </p>
            <p>
              <span className='character-details-span-left'>Skin Color: </span>
              <span>{details?.skin_color}</span>
            </p>
            <p>
              <span className='character-details-span-left'>Gender: </span>
              <span>{details?.gender}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default CharacterDetails
