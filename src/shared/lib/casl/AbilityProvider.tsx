import { createContext, ReactNode, useContext, useMemo } from 'react'
import { createContextualCan } from '@casl/react'
import { createMongoAbility } from '@casl/ability'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/providers/store'
import { AppAbility, defineAbilityFor } from './ability'

// Default empty ability
const defaultAbility = createMongoAbility()

// Context
const AbilityContext = createContext<AppAbility>(defaultAbility as AppAbility)

// Contextual Can component for JSX usage
export const Can = createContextualCan(AbilityContext.Consumer)

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

// Hook
export function useAbility() {
    return useContext(AbilityContext)
}
