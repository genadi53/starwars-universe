import config from '../config';
import EventEmitter from 'eventemitter3';
import StarWarsUniverse from './custom/StarWarsUniverse'
import Entity from './custom/Entity';

const EVENTS = {
  APP_READY: 'app_ready',
};

/**
 * App entry point.
 * All configurations are described in src/config.js
 */
export default class Application extends EventEmitter {
  constructor() {
    super();

    this.config = config;
    this.data = {
      universe: new StarWarsUniverse()
    };

    this.init();
  }

  static get events() {
    return EVENTS;
  }

  /**
   * Initializes the app.
   * Called when the DOM has loaded. You can initiate your custom classes here
   * and manipulate the DOM tree. Task data should be assigned to Application.data.
   * The APP_READY event should be emitted at the end of this method.
   */
  async init() {
    // Initiate classes and wait for async operations here.

    //const universe = new StarWarsUniverse();
    const response = await this.data.universe.init();
    const data = await response.json();

    let count = 0;

    for(let [name, entityData] of Object.entries(data)){
      const entity = new Entity(name, {entityData});
      console.log(entity);
      
      const _response = await fetch(entityData);
      const _data = await _response.json();

      this.data.universe.entities.push(entity);

      //console.log(_data.count);
      this.data.universe.entities[count].data.count = _data.count;
      console.log(this.data.universe.entities[count].data.count);
      count++;

      //this.data.universe.entities[0].data.count
      //this.data.universe.entities[0].data.count=true;
      //console.log(this.data.universe.entities[0].data.hasOwnProperty('count'));
    }

    this.data.count = this.data.universe.entities.length;
    console.log(this.data.universe.entities);

    this.emit(Application.events.APP_READY);
  }
}

