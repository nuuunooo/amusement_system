import { useState, useEffect, createContext, useRef } from 'react'

export const ProcessContext = createContext();

export function ProcessProvider({ children }) {
    const [tickets, setTickets] = useState([]);
    const calendarRef = useRef(null);
    const [reservationDate, setReservationDate] = useState('')

    const value = {
        tickets,
        setTickets,
        calendarRef,
        setReservationDate,
        reservationDate
    }

    return (
        <ProcessContext.Provider value={value}>
            { children }
        </ProcessContext.Provider>
    )
}