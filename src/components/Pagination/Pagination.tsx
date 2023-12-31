import { useCharacterContext } from '../../Context/CharacterContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import './Pagination.css'

const Pagination = () => {
  const { totalPageNumber, currentPageNumber, setCurrentPageNumber } =
    useCharacterContext()

  const pageList = new Array(totalPageNumber)
    .fill(0)
    .map((_, index) => index + 1)

  const movePageLeftRight = (action: string) => {
    if (action === 'prev' && currentPageNumber > 1) {
      managePageList(currentPageNumber - 1)
    } else if (action === 'next' && currentPageNumber < totalPageNumber) {
      managePageList(currentPageNumber + 1)
    }
  }

  const managePageList = (pageNum: number) => {
    setCurrentPageNumber(pageNum)
  }

  return (
    <div className='paging'>
      <div className='previous' onClick={() => movePageLeftRight('prev')}>
        Previous
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>
      {pageList.map((pageNum) => {
        return (
          <div
            key={pageNum}
            className={`${
              pageNum === currentPageNumber ? 'active' : ''
            } spacing`}
            onClick={() => managePageList(pageNum)}
          >
            {pageNum}
          </div>
        )
      })}

      <div className='next' onClick={() => movePageLeftRight('next')}>
        <FontAwesomeIcon icon={faArrowRight} />
        Next
      </div>
    </div>
  )
}

export default Pagination
