import { Component, inject } from '@angular/core';

import { ProdutoService } from '../../services/produto';
import { CardProduto } from '../card-produto/card-produto';

@Component({
  selector: 'app-mais-vendidos',
  imports: [CardProduto],
  templateUrl: './mais-vendidos.html',
  styleUrl: './mais-vendidos.css'
})
export class MaisVendidos {
  private readonly produtoService = inject(ProdutoService);

  readonly produtos =
    this.produtoService.buscarMaisVendidos();
}