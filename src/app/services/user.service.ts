import { Injectable } from '@angular/core';
import { getAuth, Auth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, collection, addDoc, collectionData, doc } from '@angular/fire/firestore';
import User from '../interfaces/user.interface'
import { Observable } from 'rxjs';
import { getDocs, query, updateDoc, where } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: string | null | undefined

  constructor(private auth: Auth,
    private firestore: Firestore
  ) { }






  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password)
  }



  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  

  logout() {
    return signOut(this.auth);
  }


  getUser(): Promise<string | null> {
    return new Promise((resolve, reject) => {
      const user = getAuth().currentUser;
      const noUser = 'Error username'
      if (user) {
        resolve(user.displayName); // Usuario encontrado
      } else {
        reject(noUser); // Usuario no encontrado
      }
    });
  }


  //METODO DE AGREGAR USERS A COLECCION 
  async addUser(user: Partial<User>) {

    const userRef = collection(this.firestore, 'usuarios')
    return addDoc(userRef, user)
    
  }


  // getActualID() {
  //   const userRef = collection(this.firestore, 'usuarios')
  //   console.log(' getActualID()',collectionData(userRef))

  //   return collectionData(userRef) as Observable<User[]>
  // }



  //Funcion que devuelve en HOME todos los usuarios registrados
  getAllUser(): Observable<User[]> {
    const userCollection = collection(this.firestore, 'usuarios')
    return collectionData(userCollection, { idField: 'id' }) as Observable<User[]>
  }


  async updateUser(userID: string, userData: Partial<User>) {

    const userQuery = query(
      collection(this.firestore, 'usuarios'),
      where('id', '==', userID) // Busca documentos donde el campo `id` sea igual a 'xyz123'
    );
    const querySnapshot = await getDocs(userQuery);
    const docs = querySnapshot.docs[0]; // Accede al primer (y único) documento

    console.log('ID del documento:', docs.id); // ID único de Firestore
    console.log('Datos del documento:', docs.data()); // Campos internos del documento
    const userSelect = doc(this.firestore, 'usuarios', docs.id)
    return updateDoc(userSelect, userData)
      .then((response) => {
        console.log("datos modificados ")
      })
      .catch(error => {
        console.log("datos no modificados ", error)


      })

  }









}
