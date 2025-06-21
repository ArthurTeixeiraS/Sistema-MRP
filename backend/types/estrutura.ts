export interface Estrutura {
  id: number;
  nome: string;
  itens: EstruturaItem[];
}

export interface EstruturaItem {
  idMaterial: number;
  nomeMaterial: string;
  quantidade: number;
}