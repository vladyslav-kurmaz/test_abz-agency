
  export const onRequest = async (url: string, set?: RequestInit ) => {
    try {
      const res = await fetch(url, set)
            
      if (res.status === 409) {
        return res.status
      }
  
      if (!res.ok) {
          throw new Error(`Could not fetch ${url}, status: ${res.status}`)
      }
      
  
      return await res.json();  
    } catch(e) {
      throw e
    }
  }

