import { SVGProps } from 'react'

export interface SvgComponentType extends SVGProps<SVGSVGElement> {
    color?: string
    width?: number | string
    height?: number | string
}
