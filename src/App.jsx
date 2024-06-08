import { useEffect, useRef, useState } from 'react';
import './App.css'
import useFetch from './hooks/useFetch';
import LocationCard from './components/location/LocationCard';
import ResidentCard from './components/residentCard/ResidentCard';

function App() {
  const randomId = Math.floor(Math.random() * 126) + 1;
  const [inputValue, setInputValue] = useState(randomId);
  const [location, getLocation, isLoading, hasError] = useFetch();

  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${inputValue}`;
    getLocation(url);
  }, [inputValue]);

  const textInput = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputValue(textInput.current.value.trim().toLowerCase());
    textInput.current.value = '';
  }





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
            {/* <h1 className='app__title'>Rick and Morty</h1> */}
            <form onSubmit={handleSubmit} className='app__form'>
              <input type="number" ref={textInput} className='app__form-input'  />
              <button className='app__form-btn'>Search</button>
            </form>
            {
              hasError || !+inputValue ? 
                <h2>❌ Hey! you most provide an id from 1 to 126 😢</h2>
              : 
                <>
                  <LocationCard 
                    info={location}
                  />
                  <div className="app__residents">
                    {
                      location?.residents.map((character) => (
                        <ResidentCard 
                          key={character}
                          info={character}
                        />
                      ))
                    }
                  </div>
                </>
            }
          </div>
      }
    </div>
  )
}

export default App
