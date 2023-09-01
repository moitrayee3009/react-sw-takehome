import Character from './type'

export default interface CharacterContextType {
  data: Character[]
  isLoading: boolean
  currentPageNumber: number
  totalPageNumber: number
  setCurrentPageNumber: (pageNumber: number) => void
}
