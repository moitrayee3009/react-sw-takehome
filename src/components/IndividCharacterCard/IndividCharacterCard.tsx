import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './IndividCharacterCardStyle.css'
import Character from '../../Type/type'
import Modal from '../Modal/Modal'
import { getId } from '../../common'

const IndividCharacterCard = ({ actor }: { actor: Character }) => {
  //   const data = useContext(CharacterContext)
  const [modal, setModal] = useState(false)

  const toggleModal = () => {
    //e.preventDefault()
    setModal(!modal)
  }

  const navigate = useNavigate()

  const handleNavigation = (e: React.MouseEvent<HTMLDivElement>) => {
    // navigate(`https://picsum.photos/id/${actor.imageId}/200/300`)
    e.preventDefault()

    navigate(`/${actor.url}`)
  }

  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    // navigate(`https://picsum.photos/id/${actor.imageId}/200/300`)
    //navigate(`/${actor.url}`)
    e.preventDefault()
    setModal(true)
  }

  // Generate a random number between 0 and 200
  //actor.imageId = Math.floor(Math.random() * 200)

  const imageId = getId(actor.url)

  return (
    <>
      <li className='CardContainer' onClick={handleClick}>
        <div className='ContentContainer'>
          <img
            src={`https://picsum.photos/id/${imageId}/200/300`} //https://picsum.photos/id/0/info
            alt='avatar'
          />
        </div>

        <h2 className='Title'>{actor.name}</h2>
        <div className='open-window' onClick={handleNavigation}>
          Open in new window
        </div>
      </li>

      <Modal actor={actor} modal={modal} toggleModal={toggleModal} />
    </>
  )
}

export default IndividCharacterCard
