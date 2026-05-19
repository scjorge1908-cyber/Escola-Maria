import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';
import firebaseConfigImported from '../../firebase-applet-config.json';

const firebaseConfig = {
  ...firebaseConfigImported
};

const app = initializeApp(firebaseConfig);

// Database ID from provisioned config
const databaseId = (firebaseConfigImported as any).firestoreDatabaseId || '(default)';
console.log("Firebase: Usando Database ID:", databaseId);

// Initialize Firestore with offline persistence
// We use initializeFirestore first to set settings, then the databaseId
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
}, databaseId);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Configuração de scopes e parâmetros para evitar erros de domínio se possível
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const loginWithGoogle = async () => {
  try {
    console.log("Tentando login a partir de:", window.location.origin);
    return await signInWithPopup(auth, googleProvider);
  } catch (error: any) {
    if (error.code === 'auth/unauthorized-domain') {
      console.error(
        "ERRO DE DOMÍNIO: O domínio '" + window.location.origin + "' não está autorizado no Firebase."
      );
      console.error(
        "Siga estes passos:\n" +
        "1. Acesse o Console do Firebase > Authentication > Settings > Authorized Domains.\n" +
        "2. Certifique-se de que '" + window.location.hostname + "' está na lista.\n" +
        "3. Verifique se a Chave de API no Google Cloud Console possui restrições de referenciador (HTTP) que bloqueiam este domínio."
      );
    }
    throw error;
  }
};
