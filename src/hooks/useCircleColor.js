import { useEffect, useState } from "react";

const useCircleColor = (status) => {

    const [circleColor, setCircleColor] = useState('');

    useEffect(() => {
      if (status === 'Alive') {
        setCircleColor('#04A105');
      } else if (status === 'Dead') {
        setCircleColor('#DB0708');
      } else {
        setCircleColor('gray');
      };

    }, [status]);
    

    return circleColor;
}

export default useCircleColor;