import { Component, OnInit, Injector } from '@angular/core';
import { PasResource } from '../classes/pas-resource';
import { PasService } from '../services/pas.service';
import { AcolhidoFormComponent } from '../acolhido-form/acolhido-form.component';

@Component({
  selector: 'app-acolhido-list',
  templateUrl: './acolhido-list.component.html',
  styleUrls: ['./acolhido-list.component.css'],
})
export class AcolhidoListComponent extends PasResource implements OnInit {
  //@Output() selecionado = new EventEmitter<any>();
  columns;
  dataSource;
  constructor(protected injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    let columns = [      
      {
        name: 'nome',
        label: 'Nome',
      },
    ];
    this.montaTabela(
      columns,
      this.pasService.readAcolhido(),
      AcolhidoFormComponent
    );
  }
}
