import { Injectable } from '@angular/core';

export interface OpcaoFrete {
  id: string;
  nome: string;
  prazo: string;
  valor: number;
}

@Injectable({
  providedIn: 'root'
})
export class FreteService {

  calcular(cep: string): OpcaoFrete[] {
    const cepLimpo = cep.replace(/\D/g, '');

    if (cepLimpo.length !== 8) {
      return [];
    }

    return [
      {
        id: 'pac',
        nome: 'PAC',
        prazo: '5 a 8 dias úteis',
        valor: 18.9
      },
      {
        id: 'sedex',
        nome: 'SEDEX',
        prazo: '2 a 3 dias úteis',
        valor: 28.9
      },
      {
        id: 'transportadora',
        nome: 'Transportadora',
        prazo: '3 a 5 dias úteis',
        valor: 24.9
      },
      {
        id: 'retirada',
        nome: 'Retirada na loja',
        prazo: 'Disponível após confirmação',
        valor: 0
      }
    ];
  }
}