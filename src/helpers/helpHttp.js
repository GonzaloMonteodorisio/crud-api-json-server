export const helpHttp = () => {
  const customFetch = async (endpoint, options) => {
    const defaultHeader = {
      accept: "application/json"
    }

    const controller = new AbortController();
    options.signal = controller.signal;

    options.method = options.method || 'GET';

    options.headers = options.headers 
      ? {...defaultHeader, ...options.headers} 
      : defaultHeader;

    options.body = JSON.stringify(options.body) || false;
    if (!options.body) delete options.body;

    console.info('options: ', options);

    setTimeout(() => controller.abort(), 3000);

    try {
      const res = await fetch(endpoint, options);
      console.info('res: ', res);
      return (
        res.ok
          ? await res.json()
          : Promise.reject({
            err: true,
            status: res.status || '00',
            statusText: res.statusText || 'An error occurred'
          }));
    } catch (err) {
      console.info('Caugth!');
      return err;
    } finally {
      console.info('Call ended!');
    }
  }

  const get = (url, options = {}) => customFetch(url, options);

  const post = (url, options = {}) => {
    options.method = 'POST';
    customFetch(url, options);
  }

  const put = (url, options = {}) => {
    options.method = 'PUT';
    customFetch(url, options);
  }

  const del = (url, options = {}) => {
    options.method = 'DELETE';
    customFetch(url, options);
  }

  return {
    get,
    post,
    put,
    del
  }
}