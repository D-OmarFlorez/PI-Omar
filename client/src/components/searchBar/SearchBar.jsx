import { useState } from "react";

const SearchBar = ({onSearch}) =>{
  const [idVideogames, setId] = useState ("")

  const handleChange = (event => setId(event.target.value));

  const handleEnter = (event) =>{
    if (event.key === 'Enter')return onSearch(idVideogames)
  }

  const handleSearch = () =>{
    onSearch(idVideogames)
    setId("")
 }
return(
    <div >
          <input style={{
            border: '3px solid #00ffff',
            borderRadius: '10px'
          }} type='search' onChange={handleChange} value = {idVideogames} onKeyDown={handleEnter} placeholder="busca por nombre o por numero">
          </input>
            <button onClick={() => handleSearch(idVideogames)}>Buscar</button> 
        
      </div>
)
    
}
export default SearchBar;