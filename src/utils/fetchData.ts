function wrapPromise<T>(promiseToCall: (url: string) => Promise<T>, urlToFetch: string) {
  let status = 'pending';
  let response: any;

  const suspender = (url: string) =>
    promiseToCall(url).then(
      (res) => {
        status = 'success';
        response = res;
      },
      (err: unknown) => {
        status = 'error';
        response = err;
      }
    );

  const read = (): T => {
    switch (status) {
      case 'pending':
        throw suspender(urlToFetch);
      case 'error':
        throw response;
      default:
        return response;
    }
  };

  return { read };
}

/**
 * Fetchs data allowing Suspense feature for data fetching in react 18
 */
function fetchData<T>(urlToFetch: string) {
  const promiseToCall = (url: string) =>
    fetch(url)
      .then((res) => res.json())
      .then((res) => res);

  return wrapPromise<T>(promiseToCall, urlToFetch);
}

export default fetchData;
