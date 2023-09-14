import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './IndividCharacterCardStyle.css'
import Character from '../../Type/type'
import Modal from '../Modal/Modal'
import { getId } from '../../common'

const IndividCharacterCard = ({ actor }: { actor: Character }) => {
  const [modal, setModal] = useState(false)
  const [filmNames, setFilmNames] = useState<string[]>([])

  const toggleModal = () => {
    setModal(!modal)
  }

  const navigate = useNavigate()

  const handleNavigation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const id = getId(actor.url)
    navigate(`/api/people/${id}`)
  }

  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault()
    setModal(true)
  }

  const filmUrls = actor.films

  const getFilmNames = () => {
    Promise.all(
      filmUrls.map((filmUrl) => {
        return fetch(filmUrl)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Network response was not ok: ${response.status}`)
            }
            return response.json()
          })
          .then((data) => data.title)
          .catch((error) => {
            console.error('Error fetching film data:', error)
            return null // Return a placeholder or handle the error as needed
          })
      })
    )
      .then((names) => {
        setFilmNames(names.filter((name) => name !== null))
      })
      .catch((error) => {
        console.error('Error fetching film data:', error)
      })
  }

  useEffect(() => {
    getFilmNames() // Call getFilmNames inside the useEffect
  }, [actor])

  const imageId = getId(actor.url)

  return (
    <>
      <li className='CardContainer' onClick={handleClick}>
        <div className='ContentContainer'>
          <img
            src={`https://picsum.photos/id/${imageId}/200/300`}
            alt='avatar'
          />
        </div>

        <h2 className='Title'>{actor.name}</h2>
        <div className='open-window' onClick={handleNavigation}>
          Open in new window
        </div>
        <div className='eye-color'>
          {actor.speciesColor?.map((color: string, i: number) => (
            <div
              key={i}
              className='color'
              title={`${color}`}
              style={{
                backgroundColor: `${color}`
              }}
            ></div>
          ))}
        </div>
      </li>

      <Modal
        actor={actor}
        modal={modal}
        toggleModal={toggleModal}
        filmNames={filmNames}
      />
    </>
  )
}

export default IndividCharacterCard
