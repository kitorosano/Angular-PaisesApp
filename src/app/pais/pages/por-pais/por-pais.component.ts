import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class PorPaisComponent {
  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias: boolean = false;

  constructor(private paisService: PaisService) {}

  buscar(termino: string) {
    this.hayError = false;
    this.termino = termino;
    this.paisesSugeridos = [];

    if (this.termino.length < 1) return;

    this.paisService.buscarPais(this.termino).subscribe({
      next: (paises) => {
        this.paises = paises;
        this.termino = '';
      },
      error: (err) => {
        this.hayError = true;
        this.paises = [];
      },
    });
  }

  sugerencias(termino: string) {
    this.hayError = false;
    this.termino = termino;

    if (this.termino.length < 1) {
      this.paisesSugeridos = [];
      return;
    }

    this.paisService.buscarPais(termino).subscribe({
      next: (paises) => {
        this.paisesSugeridos = paises.splice(0, 4);
      },
      error: (err) => {
        this.paisesSugeridos = [];
      },
    });
  }
}
