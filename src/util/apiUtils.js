
function executePostRequest(requestUrl, body) {
    const requestOptions = {
        method: 'POST',
        mode: 'cors', 
        headers: {
          'x-functions-key': 'SuXP1WXXLcvCAnZ3OQJoSrMIEwGdkomQZrlE16TtuVwvX3aqNFNPig==',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(body)
      };

    console.log(requestOptions);
    return "called";
}