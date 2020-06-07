//////////////////////7/Variables
const listaTweets = document.getElementById('lista-tweets');

//////////////////////Event Listeners 
eventListeners(); //call

function eventListeners() {
    //Form sent
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);

    //Borrar tweets
    listaTweets.addEventListener('click', borrarTweet);

    //Contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);
}

//////////////////////Functions
//Add tweet

function agregarTweet(event) {
    event.preventDefault();
    //Text area
    const tweet = document.getElementById('tweet').value;
    //Crear boton eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';
    //Crear elemento
    const li = document.createElement('li');
    li.innerHTML = tweet;
    //Boton eliminar
    li.appendChild(botonBorrar);
    //Agregar al DOM
    listaTweets.appendChild(li);
    //Call Add localstorage f
    agregarTweetLocalStorage(tweet);
    //console.log(tweet);
    //Clear Area text
    formulario.reset();
}
//Remove tweet
function borrarTweet(event) {
    //event.preventDefault();
    if (event.target.className === 'borrar-tweet') {
        event.target.parentElement.remove();
        borrarTweetLocalStorage(event.target.parentElement.innerText);
    }
}
//Show LocalStorage Tweets
function localStorageListo() {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    tweets.forEach(function(tweet) {
        //Crear boton eliminar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';
        //Crear elemento
        const li = document.createElement('li');
        li.innerHTML = tweet;
        //Boton eliminar
        li.appendChild(botonBorrar);
        //Agregar al DOM
        listaTweets.appendChild(li);
    });
}
//Add tweet localstorage
function agregarTweetLocalStorage(tweet) {
    let tweets
    tweets = obtenerTweetsLocalStorage();
    //Add tweet at the end
    tweets.push(tweet);
    //Convert from string to array for local storage
    localStorage.setItem('tweets', JSON.stringify(tweets));
}
//Check Localstorage
function obtenerTweetsLocalStorage() {
    let tweets;
    //Check if its empty
    if (localStorage.getItem('tweets') === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;

}
//Remove elements from Localstorage
function borrarTweetLocalStorage(tweet) {
    let tweets, tweetBorrar;
    //Remove buttom X
    tweetBorrar = tweet.substring(0, tweet.length - 1);

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet, index) { //Index muestra indice
        if (tweetBorrar === tweet) {
            tweets.splice(index, 1);
        }
    });
    console.log(tweets);
    //Array to string
    localStorage.setItem('tweets', JSON.stringify(tweets));


}