import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  columnas: string[] = ['codigo', 'nombre', 'poder', 'borrar', 'seleccionar'];

  datos: Personaje[] = [new Personaje(1, 'krilin', 'volar' ),
  new Personaje(2, 'Goku', 'teletransportarse'),
  new Personaje(3, 'Vegeta', 'revivir'),
  ];

  articuloselect: Personaje = new Personaje(0, "", "");

  @ViewChild(MatTable) tabla1!: MatTable<Personaje>;

  borrarFila(cod: number) {
    if (confirm("Realmente quiere borrarlo?")) {
      this.datos.splice(cod, 1);
      this.tabla1.renderRows();
    }
  }

  agregar() {
    if (this.articuloselect.codigo == 0) {
      alert('Debe ingresar un código de personaje distinto a cero');
      this.articuloselect = new Personaje(0, "", "");
      return;
    }

    let articuloExistente = this.datos.find(a => a.codigo === this.articuloselect.codigo);

    if (articuloExistente) {
      // Actualizar nombre y el poder si el personaje ya existe
      articuloExistente.nombre = this.articuloselect.nombre;
      articuloExistente.poder = this.articuloselect.poder;
      //this.tabla1.renderRows();
      this.articuloselect = new Personaje(0, "", "");
    } else {
      this.datos.push(new Personaje(this.articuloselect.codigo, this.articuloselect.nombre, this.articuloselect.poder));
      this.tabla1.renderRows();
      this.articuloselect = new Personaje(0, "", "");
    }

  }

  seleccionar(cod: number) {
    
    this.articuloselect.codigo = this.datos[cod].codigo;
    this.articuloselect.nombre = this.datos[cod].nombre;
    this.articuloselect.poder = this.datos[cod].poder;
  }

  modificar() {
    for (let x = 0; x < this.datos.length; x++)
      if (this.articuloselect.codigo == this.datos[x].codigo) {
        this.articuloselect.nombre = this.datos[x].nombre;
        this.articuloselect.poder = this.datos[x].poder;
        return;
      }
    alert('No existe el código de personaje ingresado');
  }

}

export class Personaje {
  constructor(public codigo: number, public nombre: string, public poder: string) {
  }
}