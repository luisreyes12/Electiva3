import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Personaje } from './personaje';
import { AppService } from './app.service';
import { saveAs } from 'file-saver'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild(MatTable) tabla1!: MatTable<Personaje>;
  columnas: string[] = ['id', 'nombre', 'poder', 'pelicula', 'borrar', 'seleccionar'];

  personajes: Personaje[];
  personajeSelect: Personaje = { nombre : '' , poder : '', pelicula: ''};
  isEdit: boolean = false;
  indexEdit: number;

  constructor(private _appService: AppService){}

  ngOnInit(){
    this.getAll();
  }

  getAll(){
    this._appService.getAll().subscribe(data => {
      this.personajes = data;
    })

  }

  borrarFila(index: number){
    if (confirm("Realmente quiere borrarlo?")) {
      const { id } = this.personajes[index];
      if(!id){
        alert('Personaje debe ser seleccionado');
        return;
      }
      
      this._appService.delete(id).subscribe({
        next: (data) => {
            const { value } = data;
            this.personajes.splice(index, 1);
            this.tabla1.renderRows();
            this.reset()
        },
        error: (errorReponse) => {
          alert('Ocurrio un error al elminar personaje');
        }
      })
    }
  }

  seleccionar(index: number){
    this.indexEdit = index;
    this.isEdit = true;
    this.personajeSelect = {...this.personajeSelect, ...this.personajes[index]}
  }

  agregar(){
    this._appService.insert(this.personajeSelect).subscribe({
      next: (data) => {
          const { value } = data;
          this.personajes.push(value);
          this.tabla1.renderRows();
          this.reset()
      },
      error: (errorReponse) => {
        alert('Ocurrio un error al agregar el nuevo personaje');
      }
    })
  }

  modificar(){
    this._appService.update(this.personajeSelect).subscribe({
      next: (data) => {
        const { message, value } = data;
        this.personajes[this.indexEdit] = value;
        this.tabla1.renderRows();
        this.reset();
        alert(message)
      },
      error: (errorResponse) => {
        console.log(errorResponse);
        alert('Ocurrio un error al actualizar personaje');
      }
    })
  }

  descargar(){
    const name = `reporte.pdf`;
    this._appService.download().subscribe(blob => saveAs(blob, name));
  }

  reset(){
    this.isEdit = false;
    this.personajeSelect = { nombre : '' , poder : '', pelicula: ''};
  }
}