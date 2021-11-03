const baseUrl = '/session?mail={mail}&password={password}'

const login = async credentials => {
    fetch('/places', {method: 'GET', credentials:'same-origin'})
    .then(response => response.text())
    .then(data => console.log(data));
  }