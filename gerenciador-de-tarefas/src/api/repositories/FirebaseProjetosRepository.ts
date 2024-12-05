import { db } from "@/infra/firebase/firebaseConfig";
import { Projeto } from "@/utils/Projeto";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore"; 

export const adicionarProjeto = async (projeto: Projeto) => {
  try {
    const docRef = await addDoc(collection(db, "Projetos"), {
      id_projeto: projeto.id_projeto,
      titulo_projeto: projeto.titulo_projeto,
      desc_projeto: projeto.desc_projeto,
      cor_projeto: projeto.cor_projeto,
      porcentagem_atividade: projeto.porcentagem_atividade,
      id_usuario: projeto.id_usuario,
      data_criacao: projeto.data_criacao // Incluindo o novo campo
    });
    return docRef
  } catch (e) {
    console.error("Erro ao adicionar projeto: ", e);
  }
}

export const buscarProjetosPorUsuario = async (
  idUsuario: string, 
  idProjeto?: string
): Promise<Projeto[]> => {
  const projetosRef = collection(db, 'Projetos');

  let q = query(projetosRef, where('id_usuario', '==', idUsuario));

  if (idProjeto) {
    q = query(q, where('id_projeto', '==', idProjeto));
  }

  const querySnapshot = await getDocs(q);
  const projetosList: Projeto[] = [];

  querySnapshot.forEach(doc => {
    const projeto = doc.data() as Projeto;
    projetosList.push(projeto);
  });

  return projetosList;
};

