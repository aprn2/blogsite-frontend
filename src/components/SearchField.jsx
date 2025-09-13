import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'

export const SearchField = ({value, onChange, onSearch}) => {

    return <>
        <div
            role='search'
            className='mx-20 mt-10 px-4 text-2xl flex gap-2 text-white border border-gray-100 rounded-xl justify-between items-center'
        >
            <input
                className='p-2 flex-grow-1 h-full'
                placeholder='search'
                onChange={(e) => onChange(e.target.value)}
                value={value}
                onKeyDown={(e) => e.key === 'Enter' && onSearch(value)}
            >
            </input>
            <button
                onClick={() => onSearch(value)}
            >
                <FaMagnifyingGlass />
            </button>
        </div>
    </>
}

