import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './IndividCharacterCardStyle.css'
import Character from '../../Type/type'
import Modal from '../Modal/Modal'
import { getId } from '../../common'

const IndividCharacterCard = ({ actor }: { actor: Character }) => {
  const [modal, setModal] = useState(false)
  const [eyeColor, setEyeColor] = useState<string[]>([])

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

  const imageId = getId(actor.url)

  const getSpeciesColor = () => {
    const [specisUrl] = actor.species.length !== 0 ? actor.species : ''
    if (!specisUrl) {
      return false
    }

    fetch(specisUrl)
      .then((response) => response.json())
      .then((res) => {
        const spsEyecolors: string = res.eye_colors

        if (spsEyecolors && spsEyecolors !== 'n/a') {
          if (spsEyecolors.indexOf(',') > -1) {
            setEyeColor(spsEyecolors.split(','))
          } else {
            setEyeColor([spsEyecolors])
          }
        }
      })
      .catch((error) => {
        console.error('Error fetching  data:', error)
      })

    console.log(eyeColor)
  }

  useEffect(() => {
    getSpeciesColor()
  }, [])

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
          {eyeColor.map((color: string, i: number) => {
            return (
              <div
                key={i}
                className='color'
                style={{
                  backgroundColor: `${color}`
                }}
              ></div>
            )
          })}
        </div>
      </li>

      <Modal actor={actor} modal={modal} toggleModal={toggleModal} />
    </>
  )
}

export default IndividCharacterCard
