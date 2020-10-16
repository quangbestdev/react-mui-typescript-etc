import { useLayoutEffect } from 'react'
import axios from 'axios'

const IP_GEOLOCATION_LOOKUP_API_URL = 'https://ipapi.co/json/'

const getRedirectHref = (code: string): string => {
  switch (code) {
    case 'MY': {
      return window.location.href.replace(/(bennsethicoa\.)(?:com|sg)/, '$1my')
    }
    case 'SG':
    default: {
      return window.location.href.replace(/(bennsethicoa\.)(?:com|my)/, '$1sg')
    }
  }
}

const redirectByIPGeolocation = async () => {
  const response = await axios.get(IP_GEOLOCATION_LOOKUP_API_URL)
  const { data } = response
  const { country_code: code } = data
  const redirectHref = getRedirectHref(code)
  if (window.location.href !== redirectHref) window.location.replace(redirectHref)
}

const useLocationRedirect = () => {
  useLayoutEffect(() => {
    redirectByIPGeolocation()
  }, [])
}

export default useLocationRedirect
