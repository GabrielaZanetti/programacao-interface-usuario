export interface Projeto {
  id_projeto: string;
  titulo_projeto: string;
  desc_projeto: string;
  cor_projeto: string;
  porcentagem_atividade: number;
  id_usuario: string | null;
  data_criacao: Date;
}
