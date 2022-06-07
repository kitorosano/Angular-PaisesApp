import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [],
})
export class PorPaisComponent {
  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  constructor(private paisService: PaisService) {}

  buscar(termino: string ) {
    this.hayError = false;
    this.termino = termino;

    if (this.termino.length < 1) return;

    this.paisService.buscarPais(this.termino).subscribe({
      next: (paises) => {
        console.log(paises)
        this.paises = paises;
      },
      error: (err) => {
        this.hayError = true;
        this.paises = [];
      },
    });
  }

  sugerencias(termino: string){
    this.hayError = false;
    // TODO: Crear sugerencias
  }
}
