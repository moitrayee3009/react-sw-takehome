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
    fetch(`https://swapi.dev/api/people/?page=${pageNumber}`)
      .then((response) => response.json())
      .then((res) => {
        const fetchSpeciesPromises = res.results.map((character: Character) => {
          const speciesUrl =
            character.species.length !== 0 ? character.species[0] : ''

          if (!speciesUrl) {
            return Promise.resolve(character)
          }

          return fetch(speciesUrl)
            .then((response) => response.json())

            .then((speciesData) => {
              const spsEyeColors: string = speciesData.eye_colors
              const replacedSpsEyeColors: string = spsEyeColors.replace(
                'golden',
                '#fff700'
              )

              if (replacedSpsEyeColors && replacedSpsEyeColors !== 'n/a') {
                if (replacedSpsEyeColors.indexOf(',') > -1) {
                  character.speciesColor = replacedSpsEyeColors.split(',')
                } else {
                  character.speciesColor = [replacedSpsEyeColors]
                }
              }

              return character // Return the updated character object
            })
            .catch((error) => {
              console.error('Error fetching species data:', error)
              return character // Return the character object even on error
            })
        })

        // Use Promise.all to wait for all fetch calls to complete
        Promise.all(fetchSpeciesPromises)
          .then((updatedData) => {
            // Update the state with the new data
            setData(updatedData)

            // Calculate total number of pages based on the total characters count
            const calculatedTotalPages = Math.ceil(res.count / 10)
            setTotalPageNumber(calculatedTotalPages)
            setIsLoading(false)
          })
          .catch((error) => {
            console.error('Error updating character data:', error)
          })
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
