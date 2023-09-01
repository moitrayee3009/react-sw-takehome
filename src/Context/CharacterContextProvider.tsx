import { useState, useEffect, ReactNode } from 'react'
import { CharacterContext } from './CharacterContext'
import Character from '../Type/type'
import CharacterContextType from '../Type/characterContextType'

type CharacterProviderProps = {
  children: ReactNode
}

const CharacterContextProvider = ({ children }: CharacterProviderProps) => {
  const [data, setData] = useState<Character[]>([])
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1)
  const [totalPageNumber, setTotalPageNumber] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    getSWCharactersList(currentPageNumber)
  }, [currentPageNumber])

  const getSWCharactersList = (pageNumber: number) => {
    setIsLoading(true)
    return fetch(`https://swapi.dev/api/people/?page=${pageNumber}`)
      .then((response) => response.json())
      .then((res) => {
        setData(res.results)
        // Calculate total number of pages based on the total characters count
        const calculatedTotalPages = Math.ceil(res.count / 10)

        setTotalPageNumber(calculatedTotalPages)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching character data:', error)
      })
  }

  const contextValue: CharacterContextType = {
    data,
    isLoading,
    currentPageNumber,
    setCurrentPageNumber: (pageNumber) => setCurrentPageNumber(pageNumber),
    totalPageNumber
  }

  return (
    <CharacterContext.Provider value={contextValue}>
      {children}
    </CharacterContext.Provider>
  )
}

export default CharacterContextProvider
