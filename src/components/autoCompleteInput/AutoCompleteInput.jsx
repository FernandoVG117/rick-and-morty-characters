import React from 'react';
import './autoCompleteInput.css';
import useAutoComplete from '../../hooks/useAutoComplete';

const AutoCompleteInput = (url) => {

    const {inputValue, suggestions, loading, error, handleInputTextChange} = useAutoComplete(url);
    
    return (
        <div className='autocomplete__container'>
            <input type="text" value={inputValue} onChange={handleInputTextChange} placeholder='Write to serch any location 👽' />
            {
                loading && <h2>Loading ... </h2>
            }
            {
                error && <h2>❌ Error fetching data ❌</h2>
            }
            <ul className='autocomplete__suggestions-list'>
                {
                    suggestions.map((suggestion, i) => (
                        <li key={i}><span>{suggestion.name}</span></li>
                    ))
                }
            </ul>
        </div>
    );
};

export default AutoCompleteInput