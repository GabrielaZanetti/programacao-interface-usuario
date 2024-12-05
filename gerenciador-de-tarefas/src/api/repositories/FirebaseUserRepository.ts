import { auth } from '@/infra/firebase/firebaseConfig';
import { CreateUser } from '@/utils/usecases/CreateUser';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

export class FirebaseUserRepository implements CreateUser {
  async execute(email: string, password: string, username: string): Promise<{ uid: string, authToken: string }> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: username,
      });
    }

    const uid = userCredential.user.uid;

    const authToken = await userCredential.user.getIdToken();
    return { uid, authToken };
  }
}
