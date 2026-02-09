import dayjs from 'dayjs'

export const dateHelpers = {
    formatDate: (date: string | Date, format = 'D MMM, YYYY h:mm A') => {
        return dayjs(date).format(format)
    },
    formatShortDate: (date: string | Date) => {
        return dayjs(date).format('DD/MM/YYYY')
    },
    formatTime: (date: string | Date) => {
        return dayjs(date).format('h:mm A')
    },
    isToday: (date: string | Date) => {
        return dayjs(date).isSame(dayjs(), 'day')
    },
}

export const getPagination = ({
    currentPage,
    rowsPerPage,
}: {
    currentPage: number
    rowsPerPage: number
}) => {
    const offset = (currentPage - 1) * rowsPerPage
    return {
        limit: rowsPerPage,
        offset,
    }
}

export const formatPrice = (price: number, currency = 'VND') => {
    return `${price.toLocaleString()} ${currency}`
}

export const slugify = (text: string) => {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
}
