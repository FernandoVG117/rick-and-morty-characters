import axios from "axios";
import { useState } from "react"


const useFetch = () => {

    const [apiData, setApiData] = useState();
    const [isLoading, setIsLoading] = useState();
    const [hasError, setHasError] = useState();
        // Peticion asincrona
    const getApi = url => {
        setIsLoading(true);
        axios.get(url)
            .then((answer) => {
                setHasError(false);
                setApiData(answer.data);
            })
            .catch(err => {
                setHasError(true);
                console.log(err);
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 1500);
            });
    }

    return [apiData, getApi, isLoading, hasError];

}

export default useFetch
