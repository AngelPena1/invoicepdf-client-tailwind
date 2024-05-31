import { useState } from 'react'

const useToggles = () => {
  const [toggles, setToggles] = useState({
    catalog: false
  })

  function HandleToggleCatalog(bool) {
    setToggles({ ...toggles, catalog: bool })
  }
  return { toggles, HandleToggleCatalog }
}

export default useToggles