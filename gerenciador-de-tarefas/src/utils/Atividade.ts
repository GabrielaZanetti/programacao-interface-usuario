export interface Atividade {
  id: string;
  titulo_atividade: string;
  descricao_atividade: string;
  status: string;
  nome_projeto: string;
  cor_projeto: string;
  id_projeto: string;
  id_usuario: string;
}

export interface AtividadesAgrupadasPorStatus {
  nome_coluna: string;
  atividades: Atividade[];
}