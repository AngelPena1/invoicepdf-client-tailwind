import { useState } from 'react'

const useToggles = () => {
  const [toggles, setToggles] = useState({
    catalog: false
  })

  function HandleToggleCatalog(bool) {
    console.log("hola");
    setToggles({ ...toggles, catalog: bool })
  }
  return { toggles, HandleToggleCatalog }
}

export default useToggles