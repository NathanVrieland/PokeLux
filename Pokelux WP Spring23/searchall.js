// this file is cursed and should not be used
function searchall() {
    const pokedexurl = 'https://beta.pokeapi.co/graphql/v1beta'
    const my_query = {
        query: `query ExampleQuery {
                    pokemon_v2_pokemon {
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
    
    const myrequest = new XMLHttpRequest();
    myrequest.responseType = 'json'
    myrequest.open('POST', pokedexurl)
    myrequest.setRequestHeader('Content-Type', 'application/json')
    
    myrequest.onload = ()=> {
        my_data = myrequest.response.data
        for(let i = 0; i < my_data.pokemon_v2_pokemon.length; i++) {
            document.getElementById("pokeinfo").innerHTML += `
            <div class = "row">
            <table>
            <tr>
                <td>
                    Name: ${my_data.pokemon_v2_pokemon[i].name}
                    <br>
                    ID: ${my_data.pokemon_v2_pokemon[i].id}
                    <br>
                    ${(my_data.pokemon_v2_pokemon[i].pokemon_v2_pokemontypes.length == 1)? 
                        "Type: " + my_data.pokemon_v2_pokemon[i].pokemon_v2_pokemontypes[0].pokemon_v2_type.name: 
                        "Types: " + my_data.pokemon_v2_pokemon[i].pokemon_v2_pokemontypes[0].pokemon_v2_type.name + 
                        ", " + 
                        my_data.pokemon_v2_pokemon[i].pokemon_v2_pokemontypes[1].pokemon_v2_type.name}
                </td>
                <td>
                    Added in Generation: ${my_data.pokemon_v2_pokemon[i].pokemon_v2_pokemonspecy.generation_id}
                    <br>
                    Height: ${my_data.pokemon_v2_pokemon[i].height / 10} m
                    <br>
                    Weight: ${my_data.pokemon_v2_pokemon[i].weight / 10} kg
                </td>
                <td>
                    <a class="btn" href=https://pokemon.fandom.com/wiki/${my_data.pokemon_v2_pokemon[i].name} target="_blank"> more info </a>
                </td>
            </tr>
            </table>
            </div>
            ` 
        }
    }
    myrequest.send(JSON.stringify(my_query))
}