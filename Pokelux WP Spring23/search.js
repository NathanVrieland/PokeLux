function search(form) {
    document.getElementById("errortext").innerHTML = ""
    const pokedexurl = 'https://beta.pokeapi.co/graphql/v1beta'
    const pokemon = form.pokemon.value
    console.log(Number(pokemon))
    if (Number.isInteger(Number(pokemon))) {
        var my_query = {
            query: `query ExampleQuery($where: pokemon_v2_pokemon_bool_exp) {
                        pokemon_v2_pokemon(where: {id: {_eq: ${pokemon.toLowerCase()}}}) {
                            name
                            id
                            weight
                            height
                            pokemon_v2_pokemontypes {
                                pokemon_v2_type {
                                name
                                }
                            }
                            pokemon_v2_pokemonspecy {
                                generation_id
                            }
                        }
    
                    }`
                }
    } else {
    var my_query = {
        query: `query ExampleQuery($where: pokemon_v2_pokemon_bool_exp) {
                    pokemon_v2_pokemon(where: {name: {_eq: ${pokemon.toLowerCase()}}}) {
                        name
                        id
                        weight
                        height
                        pokemon_v2_pokemontypes {
                            pokemon_v2_type {
                            name
                            }
                        }
                        pokemon_v2_pokemonspecy {
                            generation_id
                        }
                    }

                }`
            }
        }
    const myrequest = new XMLHttpRequest();
    myrequest.responseType = 'json'
    myrequest.open('POST', pokedexurl)
    myrequest.setRequestHeader('Content-Type', 'application/json')
    
    myrequest.onload = ()=> {
        my_data = myrequest.response.data
        if (my_data.pokemon_v2_pokemon.length == 0) {
            document.getElementById("errortext").innerHTML = "Pokemon data not found"
            return
        }
        const spriteURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${my_data.pokemon_v2_pokemon[0].id}.png`
        document.getElementById("pokeinfo").innerHTML = `
        <div class = "row">
        <table>
        <tr>
            <td>
                <img src = ${spriteURL} width = 500>
            </td>
            <td>
                Name: ${my_data.pokemon_v2_pokemon[0].name}
                <br>
                ID: ${my_data.pokemon_v2_pokemon[0].id}
                <br>
                ${(my_data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes.length == 1)? 
                    "Type: " + my_data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.name: 
                    "Types: " + my_data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.name + 
                    ", " + 
                    my_data.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes[1].pokemon_v2_type.name}
            </td>
            <td>
                Added in Generation: ${my_data.pokemon_v2_pokemon[0].pokemon_v2_pokemonspecy.generation_id}
                <br>
                Height: ${my_data.pokemon_v2_pokemon[0].height / 10} m
                <br>
                Weight: ${my_data.pokemon_v2_pokemon[0].weight / 10} kg
            </td>
            <td>
                <a class="btn" href=https://pokemon.fandom.com/wiki/${my_data.pokemon_v2_pokemon[0].name} target="_blank"> more info </a>
            </td>
        </tr>
        </table>
        </div>
        ` + document.getElementById("pokeinfo").innerHTML
        form.pokemon.value = ""
    }
    myrequest.send(JSON.stringify(my_query))
}
