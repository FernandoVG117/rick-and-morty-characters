import { useEffect, useRef, useState } from 'react';
import './App.css'
import useFetch from './hooks/useFetch';
import LocationCard from './components/location/LocationCard';
import ResidentCard from './components/residentCard/ResidentCard';
import LocationSearch from './components/locationSearch/LocationSearch';
import Pagination from './components/pagination/Pagination';

function App() {
  const randomId = Math.floor(Math.random() * 126) + 1;
  const [inputValue, setInputValue] = useState(randomId);
  const [location, getLocation, isLoading, hasError] = useFetch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${inputValue}`;
    getLocation(url);
  }, [inputValue]);

  //
  const textInput = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputValue(textInput.current.value.trim().toLowerCase());
    textInput.current.value = '';
  }
  //

  const handleSearch = (id) => {
    setInputValue(id);
  };

  // Pagination
  const quantity = 8;
  const total = Math.ceil(location?.residents.length / quantity);

  const pagination = () => {
    const end = quantity * page;
    const start = end - quantity;
    const limit = location?.residents.slice(start, end);

    return [limit];
  };




  return (
    <div className='app'>
      {
        isLoading ? 
          <div className="app__loading">
            <img src="./assets/images/rick-running-2.gif" alt="rick-run" className='app__loading-img'/>
            <h2>Loading . . . </h2>
          </div>
        : 
          <div className='app__container'>
            <div className="app__title-img"></div>

            {/* <form onSubmit={handleSubmit} className='app__form'>
              <input type="number" ref={textInput} className='app__form-input' placeholder='Enter a number'  />
              <button className='app__form-btn'>Search</button>
            </form> */}

            <LocationSearch onSearch={handleSearch} />

            {
              hasError || !+inputValue ? 
                <h2>❌ Hey! you most provide an id from 1 to 126 😢</h2>
              : 
                <>
                  <LocationCard 
                    info={location}
                  />

                  <Pagination 
                    page={page}
                    setPage={setPage}
                    total={total}
                    
                  />

                  <div className="app__residents">
                    {
                      pagination()[0]?.map((character) => (
                        <ResidentCard 
                          key={character}
                          info={character}
                        />
                      ))
                    }
                  </div>

                  <Pagination 
                    page={page}
                    setPage={setPage}
                    total={total}
                    
                  />
                </>
            }
          </div>
      }
    </div>
  )
}

export default App
