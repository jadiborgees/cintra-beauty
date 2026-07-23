export interface Produto {
  id: number;

  nome: string;
  slug: string;

  marca: string;
  categoria: string;

  genero: 'Masculino' | 'Feminino' | 'Unissex';

  volume: string;

  preco: number;
  precoAnterior?: number;

  imagem: string;

  descricao?: string;

  estoque: number;

  maisVendido?: boolean;
  novidade?: boolean;
  destaque?: boolean;

  familiaOlfativa:
    | 'Amadeirado'
    | 'Cítrico'
    | 'Doce'
    | 'Floral'
    | 'Oriental'
    | 'Aromático'
    | 'Frutado'
    | 'Fresco';

  intensidade:
    | 'Suave'
    | 'Moderado'
    | 'Forte';

  ocasiao:
    | 'Dia'
    | 'Noite'
    | 'Ambos';
}