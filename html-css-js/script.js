const img = document.getElementById('img-gatinho');

ClickBtn ();
async function ClickBtn () {
    img.setAttribute('src', 'https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif')
    await fetch('https://api.thecatapi.com/v1/images/search') .then((response) => {
        return response.json();
      })
      .then((res) => {
        const {url} = res[0];
        img.setAttribute('src', url)
      })
}

const element = document.getElementById('clique');

element.addEventListener("click", ClickBtn)