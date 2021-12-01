export const handleErrors = (fetchResponse) => {
  if (!fetchResponse.ok) {
    return fetchResponse.text().then(text => { throw new Error(text) })
  }
  return fetchResponse.json();
}

export const constructErrorMessage = (errorArray) => {
  // The auth reducer gives us errors in the below format
  // They are converted to array so they can be iterated in the FlatList:
  //[
  //  ['username', ['This field may not be blank']]
  //  ['password', ['This field may not be blank']]
  //  ['non_field_errors', ['Incorrect Credentials']]
  //]

  const errorField = errorArray[0]
  const errorMessage = errorArray[1][0]

  console.log(errorArray)

  if (errorField == 'non_field_errors') {
    return errorMessage
  } else {
    return errorField + ": " + errorMessage
  }
}

