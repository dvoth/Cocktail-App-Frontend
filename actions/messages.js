export const handleErrors = (fetchResponse) => {
  if (!fetchResponse.ok) {
    return fetchResponse.text().then(text => { throw new Error(text) })
  }
  return fetchResponse.json();
}

