import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/infra/firebase/firebaseConfig';

export class FirebaseAuthRepository {
    async authenticate(email: string, password: string): Promise<{ uid: string, token: string }> {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const token = await user.getIdToken();

        return { uid: user.uid, token };
    }
};
