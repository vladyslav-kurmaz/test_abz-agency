const useHttp = () => {
  const request = async (
    url: string,
    set?: RequestInit | undefined
  ) => {
    try {
      const res = await fetch(url, set);

      if (!res.ok) {
        return await Promise.reject(res);
      }

      return await Promise.resolve(res);
    } catch (e) {
      return await Promise.reject(e);
    }
  };

  return {
    request,
  };
};

export default useHttp;
