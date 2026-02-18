import { createContext, ReactNode, useContext, useMemo } from 'react'
import { createContextualCan } from '@casl/react'
import { createMongoAbility } from '@casl/ability'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/providers/store'
import { useCheckAccessQuery } from '@entities/adminUsers'
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

    const { data: adminUser } = useCheckAccessQuery(
        { email: user?.email ?? '' },
        { skip: !user?.email }
    )

    const ability = useMemo(() => {
        const role = adminUser?.role ?? null
        return defineAbilityFor(role)
    }, [adminUser])

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
