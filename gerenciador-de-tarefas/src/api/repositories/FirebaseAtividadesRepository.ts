import { auth, db } from "@/infra/firebase/firebaseConfig";
import { Atividade, AtividadesAgrupadasPorStatus } from "@/utils/Atividade";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

export async function adicionarAtividade(
  atividade: Omit<Atividade, "id_atividade">
): Promise<Atividade> {
  try {
    const docRef = await addDoc(collection(db, "Atividades"), atividade);

    return { ...atividade, id: docRef.id };
  } catch (error) {
    console.error("Erro ao adicionar atividade:", error);
    throw new Error("Erro ao adicionar atividade");
  }
}

const STATUS_PADROES = ['pendente', 'em andamento', 'concluído'];

export async function buscarAtividadesPorProjeto(
  id_usuario: string,
  id_projeto?: string
): Promise<AtividadesAgrupadasPorStatus[]> {
  try {
    const q = id_projeto
      ? query(
          collection(db, 'Atividades'),
          where('id_usuario', '==', id_usuario),
          where('id_projeto', '==', id_projeto)
        )
      : query(
          collection(db, 'Atividades'),
          where('id_usuario', '==', id_usuario)
        );


    const querySnapshot = await getDocs(q);
    const agrupadoPorStatus: Record<string, Atividade[]> = {};

    STATUS_PADROES.forEach(status => {
      agrupadoPorStatus[status] = [];
    });

    querySnapshot.forEach(doc => {
      const atividade = { ...doc.data(), id: doc.id } as Atividade;
      
      const status = atividade.status;

      if (!agrupadoPorStatus[status]) {
        agrupadoPorStatus[status] = [];
      }

      agrupadoPorStatus[status].push(atividade);
    });

    const resultado: AtividadesAgrupadasPorStatus[] = STATUS_PADROES.map(status => ({
      nome_coluna: status,
      atividades: agrupadoPorStatus[status],
    }));

    return resultado;
  } catch (error) {
    console.error('Erro ao buscar atividades:', error);
    throw new Error('Erro ao buscar atividades');
  }
}

export const atualizarStatusAtividade = async (idAtividade: string, novoStatus: string) => {
  const user = auth.currentUser;

  if (!user) {
    return { sucesso: false, erro: 'Usuário não autenticado' };
  }

  try {
    const atividadeRef = doc(db, 'Atividades', idAtividade);

    await updateDoc(atividadeRef, {
      status: novoStatus,
      id_usuario: user.uid
    });

    return { sucesso: true };
  } catch (error) {
    console.log(error);
    return { sucesso: false, erro: error };
  }
};
