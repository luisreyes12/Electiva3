import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from './api.config';
import { Personaje } from './personaje';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient : HttpClient) { }

  getAll(){
    return this.httpClient.get<Personaje[]>(`${API_URL}/personaje`);
  }

  insert(personaje : Personaje){
    return this.httpClient.post<any>(`${API_URL}/personaje`, personaje);
  }

  update(personaje : Personaje){
    const { id } = personaje;
    return this.httpClient.put<any>(`${API_URL}/personaje/${id}`, personaje);
  }

  delete(id : number){
    return this.httpClient.delete<any>(`${API_URL}/personaje/${id}`);
  }
}
