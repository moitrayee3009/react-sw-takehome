import Character from '../../Type/type'
import HeadingText from '../HeadingText/HeadingText'
import './Modal.css'
import { getId } from '../../common'

export default function Modal({
  actor,
  modal,
  filmNames,
  toggleModal
}: {
  actor: Character
  modal: boolean
  filmNames: string[]
  toggleModal: () => void
}) {
  const imageId = getId(actor.url)

  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      {modal && (
        <div className='modal'>
          <div onClick={toggleModal} className='overlay'></div>
          <div className='modal-content'>
            <div>
              <HeadingText text={`Details about ${actor.name} `} />
              <div className='modal-details-container'>
                <div className='modal-poster-container'>
                  <img
                    src={`https://picsum.photos/id/${imageId}/200/300`}
                    alt='avatar'
                  />
                </div>
                <div className='modal-text-container'>
                  <div className='modal-character-details'>
                    <p>
                      <span className='modal-character-details-span-left'>
                        Name:{' '}
                      </span>
                      <span className='modal-character-details-span-right'>
                        {actor?.name}
                      </span>
                    </p>
                    <p>
                      <span className='modal-character-details-span-left'>
                        Height:{' '}
                      </span>
                      <span className='modal-character-details-span-right'>
                        {actor?.height}
                      </span>
                    </p>
                    <p>
                      <span className='modal-character-details-span-left'>
                        Hair Color:{' '}
                      </span>
                      <span className='modal-character-details-span-right'>
                        {actor?.hair_color}
                      </span>
                    </p>
                    <p>
                      <span className='modal-character-details-span-left'>
                        Eye Color:{' '}
                      </span>
                      <span className='modal-character-details-span-right'>
                        {actor?.eye_color}
                      </span>
                    </p>
                    <p>
                      <span className='modal-character-details-span-left'>
                        Skin Color:{' '}
                      </span>
                      <span className='modal-character-details-span-right'>
                        {actor?.skin_color}
                      </span>
                    </p>
                    <p>
                      <span className='modal-character-details-span-left'>
                        Gender:{' '}
                      </span>
                      <span className='modal-character-details-span-right'>
                        {actor?.gender}
                      </span>
                    </p>
                    {filmNames.length !== 0 && (
                      <div>
                        <span className='modal-character-details-span-left'>
                          Films:{' '}
                        </span>
                        <ul className='film-name'>
                          {filmNames.map((film: string, i: number) => {
                            return (
                              <li key={i}>
                                <span className='modal-film-name'>{film}</span>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <button className='close-modal' onClick={toggleModal}>
              X
            </button>
          </div>
        </div>
      )}
      <p></p>
    </>
  )
}
