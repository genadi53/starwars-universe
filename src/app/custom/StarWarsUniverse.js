export default class StarWarsUniverse {
    constructor() {
        this.entities = [];
       
    }

    async init(){
       return await fetch('https://swapi.booost.bg/api/');
    }
}