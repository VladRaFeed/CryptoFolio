import { computed, inject, Injectable } from '@angular/core';
import { Auth, user, signInWithEmailAndPassword,  createUserWithEmailAndPassword, signOut} from '@angular/fire/auth';
import { toSignal } from '@angular/core/rxjs-interop';
import { updateProfile } from 'firebase/auth';
import {Firestore, doc, setDoc} from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private fireStore = inject(Firestore);

  public currentUser = toSignal(user(this.auth), {initialValue: null});

  public isLoggedIn = computed(() => !!this.currentUser); 

  login(email: string, pass: string): Promise<void> {
    return signInWithEmailAndPassword(this.auth, email, pass).then(() => undefined);
  };

  async register(email: string, pass: string, username: string): Promise<void> {
    const userCredentials = await createUserWithEmailAndPassword(this.auth, email, pass);

    const uid = userCredentials.user.uid;

    if(userCredentials.user) {
      await updateProfile(userCredentials.user, {displayName: username});
    };

    const userDocRef = doc(this.fireStore, `users/${uid}`);

    await setDoc(userDocRef, {
      username: username, 
      email: email,
      createdAt: new Date().toISOString(),
      role: 'user'
    });

    return;
  };

  logout(): Promise<void> {
    return signOut(this.auth).then(() => undefined);
  };

  getCurrentUserUid(): string | null {
    const currUser = this.currentUser();
    return currUser ? currUser.uid : null;
  };

};
