import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Pokemon } from './pokemon';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class PokedexService {
  private baseUrl: string = 'https://pokeapi.co/api/v2/pokemon/';
  private baseSpriteUrl: string = 'https://raw.githubusercontent.com/PokeApi/sprites/master/sprites/pokemon/';

  constructor(private http: Http) { }

  getPokemon(offset: number, limit: number): Promise<any> {
    return this.http.get(`${this.baseUrl}?offset=${offset}&limit=${limit}`)
    .toPromise()

    /*
     1) .json() => returns a promise that resolves with an object literal containing JSON data
     2) .results => array of objects containing NamedAPIResource for requested endpoint
     */
    .then(response => response.json().results)
    .then(items => items.map((item, idx) => {
      const id: number = idx + offset + 1;
      return {
        name: item.name,
        sprite: `${this.baseSpriteUrl}${id}.png`,
        id
      };
    }));
  }

  getPokemonTypes(id: number): Promise<any> {
    return this.http.get(`${this.baseUrl}${id}/`)
    .toPromise()
    .then(response => response.json())
    .then(details => {
      const types = details.types
      .map(t => {
        return t.type.name;
      });
      return types;
    });
  }

}
