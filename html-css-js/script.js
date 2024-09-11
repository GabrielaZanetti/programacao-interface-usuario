const img = document.getElementById('img-gatinho');
const element = document.getElementById('clique');

ClickBtn()

async function ClickBtn () {
    element.disabled = true;
    img.setAttribute('src', 'https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif')
    
    await fetch('https://api.thecatapi.com/v1/images/search') .then((response) => {
        return response.json();
    })
    .then((res) => {
        const {url} = res[0];
        img.setAttribute('src', url)
        setTimeout(() => {
            element.disabled = false;
        }, 800)
    })
}


element.addEventListener("click", ClickBtn)