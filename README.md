# Run the app

I used the angular cli for initial project structure and to save some time on the boilerplate code..
Also I used bootstrap for some default styling.

  - 1 Run npm i
  - 2 Run ng serve

# App structure

  - Modules:
    - App - main module
    - Shared - imports and exports all the reusable components - FilterPipe, LoaderComponent
    - Dashboard - module that uses the shared module and also some angular's built in modules and also imports it's child componens
    - Core - holds all the services in one place
  - Components
    -  App - main component
    -  Dashboard - wraps router-outlet tag (a placeholder for app's routing) and uses loader component to show spinner when data is loaded
    - PokemonList - displays a list with 100 pokemons. When one of the pokemons is selected it will navigate to evolution chain view and pass the id of the selected pokemon
    -  EvolutionChain - recieves an evolution chain for a specific pokemon, converts the chain to a list using recursive function and displays the list
    - LoaderComponent - subscribes to the loader service and recies a boolean value to know when to show or hide the pokeball loader
 - Pipes
    -  Filter - a simple filter pipe to filter the provided list
 - Services
    -  Http - http service to handle api calls
    -  PokemonData - service that uses Http service and handles api calls which are specific for pokemon data
    -  EvolutionChainResolver - used to resolve the route only after the showEvolutionChain call responses
    -  LoaderService / LoaderInterceptor - intercepting http requests/responses to notify the LoaderComponent when to show or hide the loader
