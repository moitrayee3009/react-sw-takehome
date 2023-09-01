import { useCharacterContext } from '../../Context/CharacterContext'
import Spinner from '../Spinner/Spinner'
import IndividCharacterCard from '../IndividCharacterCard/IndividCharacterCard'
import Character from '../../Type/type'
import './CharacterListStyle.css'
import Pagination from '../Pagination/Pagination'
import HeadingText from '../HeadingText/HeadingText'

const CharacterList = () => {
  const { data, isLoading } = useCharacterContext()

  if (isLoading) {
    return (
      <div className='position'>
        <Spinner />
      </div>
    )
  }

  return (
    <>
      <div className='container'>
        <HeadingText text='Star Wars popular movie characters' />
        <ul className='character-list-container'>
          {data.map((item: Character, i: number) => {
            return <IndividCharacterCard key={i} actor={item} />
          })}
        </ul>

        <Pagination />
      </div>
    </>
  )
}

export default CharacterList
