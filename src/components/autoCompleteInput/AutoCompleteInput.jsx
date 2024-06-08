import React, { useState } from 'react';
import './autoCompleteInput.css';

const AutoCompleteInput = ({suggestions, onSelect}) => {

    const [inputValue, setInputValue] = useState('');
    const [filterSuggestions, setFilterSuggestions] = useState([]);

    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        if (value) {
            const filtered = suggestions.filter((suggestion) => {
                suggestion.name.toLowerCase().includes(value.toLowerCase());
            });
            setFilterSuggestions(filtered);
        } else {
            setFilterSuggestions([]);
        };
    };

    const handleSelect = (suggestion) => {
        setInputValue(suggestion.name);
        setFilterSuggestions([]);
        onSelect(suggestion.id);
    }

    return (
        <div className="autocomplete">
            <input type="text" value={inputValue} onChange={handleChange} className='autocomplete__input' />
            {
                filterSuggestions.length > 0 && (
                    <ul className='autocomplete__list'>
                        {
                            filterSuggestions.map((suggestion) => (
                                <li 
                                    key={suggestion.id}
                                    onClick={() => handleSelect(suggestion)}
                                    className='autocomplete__list-item'
                                >
                                    {suggestion.name}
                                </li>
                            ))
                        }
                    </ul>
                )
            }
        </div>
    );
};

export default AutoCompleteInput
