import { db } from "@/infra/firebase/firebaseConfig";
import { Projeto } from "@/utils/Projeto";
import { getIdUsuario } from "@/utils/auth";
import { collection, addDoc, query, where, getDocs, updateDoc } from "firebase/firestore";

export const adicionarProjeto = async (projeto: Projeto) => {
  try {
    const docRef = await addDoc(collection(db, "Projetos"), {
      id_projeto: projeto.id_projeto,
      titulo_projeto: projeto.titulo_projeto,
      desc_projeto: projeto.desc_projeto,
      cor_projeto: projeto.cor_projeto,
      porcentagem_atividade: projeto.porcentagem_atividade,
      id_usuario: projeto.id_usuario,
      data_criacao: projeto.data_criacao
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
  const id_usuario = getIdUsuario();

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

export async function recalcularPorcentagemProjeto(id_projeto: string) {
  const id_usuario = getIdUsuario();
  if (!id_usuario) return;
  try {
    const q = query(collection(db, 'Atividades'), 
      where('id_usuario', '==', id_usuario), 
      where('id_projeto', '==', id_projeto)
    );
    const querySnapshot = await getDocs(q);

    let totalAtividades = 0;
    let atividadesConcluidas = 0;
    // console.log(totalAtividades);

    querySnapshot.forEach((doc) => {
      totalAtividades++;
      if (doc.data().status === 'concluído') {
        atividadesConcluidas++;
      }
    });

    const porcentagemAtividade = totalAtividades > 0 
      ? (atividadesConcluidas / totalAtividades) * 100
      : 0;

    await atualizarPorcentagemPorIdProjeto(id_projeto, porcentagemAtividade)
    return porcentagemAtividade;
  } catch (error) {
    console.error('Erro ao recalcular porcentagem do projeto:', error);
  }
}

export async function atualizarPorcentagemPorIdProjeto(id_projeto: string, porcentagemAtividade: number) {
  try {
    const q = query(collection(db, 'Projetos'), where('id_projeto', '==', id_projeto));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error('Nenhum projeto encontrado com o id_projeto:', id_projeto);
      return;
    }

    querySnapshot.forEach(async (docSnapshot) => {
      const projetoRef = docSnapshot.ref;
      await updateDoc(projetoRef, {
        porcentagem_atividade: porcentagemAtividade,
      });
    });
  } catch (error) {
    console.error('Erro ao atualizar porcentagem do projeto:', error);
  }
}

export const buscarPorcentagemPorIdProjeto = async (id_projeto: string): Promise<number | null> => {
  try {
    const q = query(
      collection(db, "Projetos"),
      where("id_projeto", "==", id_projeto)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docData = querySnapshot.docs[0].data();
      return docData.porcentagem_atividade || 0;
    } else {
      console.log("Projeto não encontrado");
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar porcentagem de atividade:", error);
    return null;
  }
};
