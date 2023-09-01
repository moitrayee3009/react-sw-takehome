import { createContext, useContext } from 'react'
import CharacterContextType from '../Type/characterContextType'

export const CharacterContext = createContext<CharacterContextType | undefined>(
  undefined
)

// Utility hook to access the CharacterContext safely
export const useCharacterContext = () => {
  const context = useContext(CharacterContext)

  if (context === undefined) {
    throw new Error(
      'useCharacterContext must be used within a CharacterProvider'
    )
  }

  return context
}
