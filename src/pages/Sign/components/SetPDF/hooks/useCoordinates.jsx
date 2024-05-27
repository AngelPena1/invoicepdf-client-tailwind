import { useEffect, useState } from "react";

const useCoordinates = ({ maxPages }) => {
  const [coordinates, setCoordinates] = useState([]);

  function createArray(length) {
    return new Array(length).fill(null).map(() => ({ x: 0, y: 0 }));
  }
  function HandleCoordinate(index, positionX, positionY) {
    let newCoordinate = coordinates.map((coordinate, localIndex) => {
        if(index !== localIndex) return coordinate
        coordinate.x = positionX
        coordinate.y = positionY
        return coordinate
    })
    return setCoordinates(newCoordinate)
  }

  useEffect(() => {
    return setCoordinates(createArray(maxPages))
  }, [maxPages])
  
  return { coordinates, HandleCoordinate };
};

export default useCoordinates;
