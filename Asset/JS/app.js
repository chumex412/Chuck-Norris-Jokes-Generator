document.querySelector('form').addEventListener('submit', getJokes);

function getJokes(e) {

  const number = document.querySelector('#number').value;

  const xhr = new XMLHttpRequest();

  xhr.onload = function() {
    if(this.status === 200) {
      const response = JSON.parse(this.responseText);
      let output = '';
      if(response.type === 'success') {
        response.value.forEach((joke) => {
          output += `
            <li>${joke.joke}</li>
          `; 
        });
      } else {
        output = `
          <li>Unable to Fetch Jokes</li>
        `;
      }
      document.querySelector('.jokes').innerHTML = output;
    }
  }

  xhr.onerror = () => {
    console.log('Error: Could not Fetch Data')
  }

  xhr.open('GET', `http://api.icndb.com/jokes/random/${number}`, true);

  xhr.send();

  e.preventDefault();
}