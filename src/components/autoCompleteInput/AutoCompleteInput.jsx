import React, { useState } from 'react';
import './autoCompleteInput.css';
import useAutoComplete from '../../hooks/useAutoComplete';

const AutoCompleteInput = ({suggestions, onSelect}) => {

    const [inputValue, setInputValue] = useState('');
    const [filterSuggestions, setFilterSuggestions] = useState([]);
    return (
        <div className="autocomplete">
            
        </div>
    );
};

export default AutoCompleteInput
