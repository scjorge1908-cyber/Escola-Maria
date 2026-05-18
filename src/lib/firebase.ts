import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Configuração de scopes e parâmetros para evitar erros de domínio se possível
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const loginWithGoogle = async () => {
  try {
    return await signInWithPopup(auth, googleProvider);
  } catch (error: any) {
    if (error.code === 'auth/unauthorized-domain') {
      console.error(
        "DOMÍNIO NÃO AUTORIZADO: Adicione 'scjorge1908-cyber.github.io' no Console do Firebase > Authentication > Settings > Authorized Domains."
      );
    }
    throw error;
  }
};
