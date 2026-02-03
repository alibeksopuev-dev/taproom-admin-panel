import { SvgComponentType } from './types'

export const Filter = ({
    color = '#774CFF',
    width = 20,
    height = 18,
    ...other
}: SvgComponentType) => (
    <svg width={width} height={height} viewBox="0 0 20 18" fill="none" {...other}>
        <path
            d="M17.7468 1.69491L14.6112 5.27118L11.4757 8.84745V16.3135L9.95871 15.8729L8.45024 15.4407L8.33159 12.0508L8.21295 8.66101L5.23838 5.18643L2.25533 1.69491H17.7468ZM17.7468 3.67002e-09H2.25533C1.93132 -2.13141e-05 1.6141 0.0928281 1.34124 0.267549C1.06837 0.44227 0.851311 0.69154 0.715759 0.98583C0.580207 1.28012 0.531848 1.6071 0.576411 1.92802C0.620973 2.24895 0.75659 2.55038 0.967194 2.79661L3.95024 6.28813L6.54346 9.32202L6.63668 12.1017L6.75532 15.4915C6.76843 15.8491 6.89437 16.1933 7.11511 16.475C7.33584 16.7566 7.64004 16.9611 7.98414 17.0593L9.49261 17.5L11.0011 17.9322C11.1527 17.9754 11.3095 17.9982 11.4672 18C11.8368 18.0018 12.1969 17.8828 12.4926 17.661C12.7031 17.5031 12.874 17.2984 12.9916 17.0631C13.1093 16.8277 13.1706 16.5682 13.1706 16.3051V9.48304L15.8824 6.38982L19.018 2.81356C19.233 2.56885 19.3729 2.26738 19.421 1.94523C19.4691 1.62308 19.4234 1.29389 19.2893 0.997059C19.1552 0.700226 18.9384 0.448323 18.6648 0.271497C18.3913 0.0946712 18.0726 0.00041201 17.7468 3.67002e-09Z"
            fill={color}
        />
    </svg>
)

export const Plus = ({
    color = '#1D2734',
    width = 12,
    height = 12,
    ...other
}: SvgComponentType) => (
    <svg width={width} height={height} viewBox="0 0 12 12" fill="none" {...other}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.12825 0.2564C6.47014 0.256399 6.7473 0.533556 6.7473 0.875447L6.7473 5.50919L11.381 5.50919C11.7229 5.50919 12.0001 5.78635 12.0001 6.12824C12.0001 6.47013 11.7229 6.74729 11.381 6.74729L6.7473 6.74729L6.7473 11.381C6.7473 11.7229 6.47014 12.0001 6.12825 12.0001C5.78636 12.0001 5.50921 11.7229 5.50921 11.381L5.50921 6.74729L0.87547 6.74729C0.53358 6.74729 0.256423 6.47013 0.256423 6.12824C0.256423 5.78635 0.53358 5.50919 0.87547 5.50919L5.50921 5.50919L5.50921 0.875446C5.50921 0.533556 5.78636 0.256399 6.12825 0.2564Z"
            fill={color}
        />
    </svg>
)

export const LogOut = ({
    color = '#774CFF',
    width = 18,
    height = 22,
    ...other
}: SvgComponentType) => (
    <svg width={width} height={height} viewBox="0 0 18 22" fill="none" {...other}>
        <path
            d="M9.585 11.8355L11.0363 13.287C11.1159 13.364 11.1791 13.4561 11.2223 13.5577C11.2655 13.6593 11.2878 13.7685 11.2878 13.8788C11.2878 13.9891 11.2655 14.0983 11.2223 14.2C11.1791 14.3016 11.1159 14.3936 11.0363 14.4706C10.878 14.6274 10.6636 14.7155 10.44 14.7155C10.2164 14.7155 10.002 14.6274 9.84375 14.4706L6.94125 11.5899C6.78522 11.4296 6.69801 11.2154 6.69801 10.9925C6.69801 10.7696 6.78522 10.5555 6.94125 10.3952L9.84375 7.51444C10.002 7.35762 10.2164 7.26954 10.44 7.26954C10.6636 7.26954 10.878 7.35762 11.0363 7.51444C11.1159 7.59142 11.1791 7.68344 11.2223 7.78508C11.2655 7.88672 11.2878 7.99591 11.2878 8.10622C11.2878 8.21653 11.2655 8.32572 11.2223 8.42735C11.1791 8.52899 11.1159 8.62101 11.0363 8.69799L9.57375 10.1607H18V8.78732C18 4.65605 18 2.56809 16.695 1.28404C15.615 0.256808 14.085 0 11.385 0H6.55875C3.85875 0 2.32875 0.256808 1.305 1.28404C0 2.56809 0 4.65605 0 8.78732V13.1866C0 17.329 0 19.4058 1.305 20.701C2.03914 21.3784 2.99231 21.7742 3.99375 21.8176C5.60488 21.9739 7.22431 22.0299 8.8425 21.985H9.10125C10.7194 22.0299 12.3389 21.9739 13.95 21.8176C14.9514 21.7742 15.9046 21.3784 16.6388 20.701C18 19.4058 18 17.329 18 13.1866V11.8355H9.585Z"
            fill={color}
        />
    </svg>
)

export const Pencil = ({
    color = '#9CA3AF',
    width = 16,
    height = 16,
    ...other
}: SvgComponentType) => (
    <svg width={width} height={height} viewBox="0 0 16 16" fill="none" {...other}>
        <path
            d="M11.333 2.00004C11.5081 1.82494 11.716 1.68605 11.9447 1.59129C12.1735 1.49653 12.4187 1.44775 12.6663 1.44775C12.914 1.44775 13.1592 1.49653 13.3879 1.59129C13.6167 1.68605 13.8246 1.82494 13.9997 2.00004C14.1748 2.17513 14.3137 2.38306 14.4084 2.61178C14.5032 2.84051 14.552 3.08571 14.552 3.33337C14.552 3.58104 14.5032 3.82624 14.4084 4.05496C14.3137 4.28369 14.1748 4.49161 13.9997 4.66671L4.99967 13.6667L1.33301 14.6667L2.33301 11L11.333 2.00004Z"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

export const Delete = ({
    color = '#EF4444',
    width = 18,
    height = 20,
    ...other
}: SvgComponentType) => (
    <svg width={width} height={height} viewBox="0 0 18 20" fill="none" {...other}>
        <path
            d="M1 5H17M7 9V15M11 9V15M2 5L3 17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19H13C13.5304 19 14.0391 18.7893 14.4142 18.4142C14.7893 18.0391 15 17.5304 15 17L16 5M6 5V2C6 1.73478 6.10536 1.48043 6.29289 1.29289C6.48043 1.10536 6.73478 1 7 1H11C11.2652 1 11.5196 1.10536 11.7071 1.29289C11.8946 1.48043 12 1.73478 12 2V5"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

export const ArrowBack = ({
    color = '#9CA3AF',
    width = 24,
    height = 24,
    ...other
}: SvgComponentType) => (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...other}>
        <path
            d="M19 12H5M5 12L12 19M5 12L12 5"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

export const Search = ({
    color = '#9CA3AF',
    width = 20,
    height = 20,
    ...other
}: SvgComponentType) => (
    <svg width={width} height={height} viewBox="0 0 20 20" fill="none" {...other}>
        <path
            d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

export const Settings = ({
    color = '#9CA3AF',
    width = 20,
    height = 20,
    ...other
}: SvgComponentType) => (
    <svg width={width} height={height} viewBox="0 0 20 20" fill="none" {...other}>
        <path
            d="M3.33301 10.8333V9.16667M3.33301 10.8333C2.41253 10.8333 1.66634 11.5795 1.66634 12.5C1.66634 13.4205 2.41253 14.1667 3.33301 14.1667M3.33301 10.8333C4.25349 10.8333 4.99967 11.5795 4.99967 12.5C4.99967 13.4205 4.25349 14.1667 3.33301 14.1667M3.33301 14.1667V15.8333M3.33301 4.16667V5.83333M3.33301 5.83333C2.41253 5.83333 1.66634 6.57952 1.66634 7.5C1.66634 8.42048 2.41253 9.16667 3.33301 9.16667C4.25349 9.16667 4.99967 8.42048 4.99967 7.5C4.99967 6.57952 4.25349 5.83333 3.33301 5.83333ZM9.99967 4.16667V12.5M9.99967 12.5C9.0792 12.5 8.33301 13.2462 8.33301 14.1667C8.33301 15.0871 9.0792 15.8333 9.99967 15.8333C10.9202 15.8333 11.6663 15.0871 11.6663 14.1667C11.6663 13.2462 10.9202 12.5 9.99967 12.5ZM16.6663 10.8333V15.8333M16.6663 10.8333C15.7459 10.8333 14.9997 10.0871 14.9997 9.16667C14.9997 8.24619 15.7459 7.5 16.6663 7.5M16.6663 10.8333C17.5868 10.8333 18.333 10.0871 18.333 9.16667C18.333 8.24619 17.5868 7.5 16.6663 7.5M16.6663 7.5V4.16667"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

export const Menu = ({
    color = '#f1f5f9',
    width = 24,
    height = 24,
    ...other
}: SvgComponentType) => (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...other}>
        <path
            d="M3 12H21M3 6H21M3 18H21"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

export const ChevronRight = ({
    color = '#9CA3AF',
    width = 24,
    height = 24,
    ...other
}: SvgComponentType) => (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...other}>
        <path
            d="M9 18L15 12L9 6"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

export const Category = ({
    color = '#774CFF',
    width = 20,
    height = 20,
    ...other
}: SvgComponentType) => (
    <svg width={width} height={height} viewBox="0 0 20 20" fill="none" {...other}>
        <path
            d="M8.33333 2.5H2.5V8.33333H8.33333V2.5Z"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M17.5 2.5H11.6667V8.33333H17.5V2.5Z"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M17.5 11.6667H11.6667V17.5H17.5V11.6667Z"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M8.33333 11.6667H2.5V17.5H8.33333V11.6667Z"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

export const MenuBook = ({
    color = '#774CFF',
    width = 20,
    height = 20,
    ...other
}: SvgComponentType) => (
    <svg width={width} height={height} viewBox="0 0 20 20" fill="none" {...other}>
        <path
            d="M2.5 2.5H7.5C8.16304 2.5 8.79893 2.76339 9.26777 3.23223C9.73661 3.70107 10 4.33696 10 5V17.5C10 17.0027 9.80246 16.5258 9.45083 16.1742C9.09919 15.8225 8.62228 15.625 8.125 15.625H2.5V2.5Z"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M17.5 2.5H12.5C11.837 2.5 11.2011 2.76339 10.7322 3.23223C10.2634 3.70107 10 4.33696 10 5V17.5C10 17.0027 10.1975 16.5258 10.5492 16.1742C10.9008 15.8225 11.3777 15.625 11.875 15.625H17.5V2.5Z"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)
