import { createContext, ReactNode, useContext, useMemo } from 'react'
import { createContextualCan } from '@casl/react'
import { createMongoAbility } from '@casl/ability'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/providers/store'
import { AppAbility, defineAbilityFor } from './ability'

// Create a default ability instance to avoid undefined
const defaultAbility = createMongoAbility()

// Create the context with a default value
const AbilityContext = createContext<AppAbility>(defaultAbility as AppAbility)

// Create the Can component bound to our context
export const Can = createContextualCan(AbilityContext.Consumer)

// Provider component
interface AbilityProviderProps {
    children: ReactNode
}

export function AbilityProvider({ children }: AbilityProviderProps) {
    const user = useSelector((state: RootState) => state.session.user)

    const ability = useMemo(() => {
        return defineAbilityFor(user)
    }, [user])

    return (
        <AbilityContext.Provider value={ability}>
            {children}
        </AbilityContext.Provider>
    )
}

// Hook to use ability in components
export function useAbility() {
    const ability = useContext(AbilityContext)
    return ability
}
