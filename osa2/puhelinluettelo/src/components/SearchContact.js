import React from 'react'

const Search = ({ searchTerm, handleSearchChange }) => {
    return (
        <div>
                Search from phonebook: <input value={searchTerm} onChange={handleSearchChange} />
        </div>
    )
}

export default Search