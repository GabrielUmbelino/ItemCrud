import { UnidadesMedidas } from './unidadesMedidas';

export class Item {
  id: number;
  nome: String;
  unidadeMedida: UnidadesMedidas;
  quantidade: Number;
  preco: Number;
  perecivel: Boolean;
  validade: Date;
  fabricacao: Date;
}
