import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlattener,
  MatTreeFlatDataSource,
} from '@angular/material/tree';
import { AcolhimentoRelatorioService } from '../acolhimento/relatorio/acolhimento-relatorio.service';

interface FoodNode {
  name: string;
  link?: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Programa de Acolhimento',
    children: [
      { name: 'Prontuários - PAS', link: '/acolhimento/prontuario' },
      { name: 'Acolhidos', link: '/acolhimento/acolhido' },
      { name: 'Grupos Terapêuticos', link: '/acolhimento/grupo-terapeutico' },
      { name: 'Livro Diário', link: '/acolhimento/livro-diario' },
      { name: 'Normas', link: '/acolhimento/norma' },
      { name: 'Rotina Diária', link: '/acolhimento/rotina-diaria' },
      { name: 'Relatórios', link: '/acolhimento/relatorio' },
    ],
  },
  {
    name: 'Comunidade',
    children: [
      {
        name: 'Dados da Entidade',
        link: '/comunidade/comunidade',
      },
      {
        name: 'Colaboradores',
        link: '/colaborador/colaborador',
      },
    ],
  },
  {
    name: 'Colaborador',
    children: [
      {
        name: 'Colaboradores',
        link: '/colaborador/colaborador',
      },
    ],
  },
  {
    name: 'Admin',
    children: [
      {
        name: 'Usuários',
        link: '/admin/user',
      },
    ],
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      link: node.link,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private breakpointObserver: BreakpointObserver,
    private acolhimentoRelatorioService: AcolhimentoRelatorioService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
    this.dataSource.data = TREE_DATA;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
