let PokemonList = [];
getAllPokemons();

async function getAllPokemons() {
    PokemonList = [];
    const data = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const pokeList = await data.json();
    pokeList.results.forEach(pokemon => {
        fetchPokemonData(pokemon);
    });
    setTimeout(() => {
        renderPokemon();
    }, 2000);
}

async function fetchPokemonData(pokemon) {
    let url = pokemon.url;
    const data = await fetch(url);
    const pokeData = await data.json();
    
    pokeData.types.forEach(ele => {
        console.log(ele.type.name + " ");
    });
    const imgPath = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + pokeData.id + '.png';
    let Pokemon = {
        name: pokeData.name,
        id: pokeData.id,
        types: pokeData.types,
        img: imgPath
    }  
    PokemonList.push(Pokemon);
}

function renderPokemon() {
    PokemonList.sort((a, b) => a.id - b.id);
    var template = document.getElementById('pokemon-article');
    PokemonList.forEach(Pokemon => {
        console.log(Pokemon.id + " " + Pokemon.name);         
        var clone = template.cloneNode(true);
        var img = clone.querySelector('img');
        img.src = Pokemon.img;
        var tags = clone.querySelector('.tags');        
        Pokemon.types.forEach(ele => {    
            var anchor = document.createElement('a');
            anchor.className = '.tags';
            console.log(ele.type.name + " ");
            anchor.innerHTML = ele.type.name;
            tags.appendChild(anchor);
        });
        var name = clone.querySelector('.author-name-prefix');
        name.innerHTML = Pokemon.name.replace(/^./, Pokemon.name[0].toUpperCase());
        template.parentNode.appendChild(clone);
        
    });
    
    template.parentElement.style.display = "flex";
    template.parentNode.firstElementChild.remove();
}
