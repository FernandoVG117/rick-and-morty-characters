import React, { useState } from 'react';
import './autoCompleteInput.css';
import useAutoComplete from '../../hooks/useAutoComplete';

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

    return (
        <div className="autocomplete">
            <input type="text" value={inputValue} onChange={handleChange} className='autocomplete__input' />

        </div>
    );
};

export default AutoCompleteInput
