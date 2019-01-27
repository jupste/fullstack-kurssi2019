import React from 'react'

const Filter = ({modifySearch, search}) => {
    return (
    <div>
    <form onSubmit={modifySearch}>
      <div>
        search countries
        <input value={search}
        onChange={modifySearch}/>
      </div>
    </form>
    </div>
    )
}
    
export default Filter