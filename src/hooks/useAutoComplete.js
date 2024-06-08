import { useEffect, useState } from "react";
import useFetch from "./useFetch";

const useAutoComplete = (url) => {

    const [inputValue, setInputValue] = useState('');
    const [text, getText, isLoading, hasError] = useFetch();

    useEffect(() => {
      if (inputValue) {
        getText(`${url}?query=${inputValue}`);
      };
    }, [inputValue, url, getText]);

    const handleInputTextChange = (e) => {
        setInputValue(e.target.value);
    };

  return {
    inputValue, 
    suggestions: text,
    loading: isLoading,
    error: hasError,
    handleInputTextChange,
  };
}

export default useAutoComplete

