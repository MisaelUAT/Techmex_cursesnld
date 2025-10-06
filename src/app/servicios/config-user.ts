import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, setDoc, deleteDoc, collectionData } from '@angular/fire/firestore';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigUser {
  registros: any;

  constructor(private firestore: Firestore) { }

  // 🔹 CREATE
  async Create_Coleccion(Coleccion: string, Form: any): Promise<string | false> {
    try {
      const colRef = collection(this.firestore, Coleccion);
      const response = await addDoc(colRef, Form);
      return response.id;
    } catch (error) {
      console.error('Error al crear documento:', error);
      return false;
    }
  }

  // 🔹 READ
  async Read_Coleccion(Coleccion: string): Promise<any[]> {
    try {
      const colRef = collection(this.firestore, Coleccion);
      const data$: Observable<any[]> = collectionData(colRef, { idField: 'id' });
      const registros = await firstValueFrom(data$); // Convertimos Observable en Promise
      return registros;
    } catch (error) {
      console.error('Error al leer colección:', error);
      return [];
    }
  }

  // 🔹 UPDATE
  async Update(coleccion: string, registro: any): Promise<boolean> {
    try {
      const docRef = doc(this.firestore, `${coleccion}/${registro.id}`);
      await setDoc(docRef, registro);
      return true;
    } catch (error) {
      console.error('Error al actualizar documento:', error);
      return false;
    }
  }

  // 🔹 DELETE
  async Delete_Coleccion(Coleccion: string, Registro: any): Promise<boolean> {
    try {
      const docRef = doc(this.firestore, `${Coleccion}/${Registro.id}`);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.error('Error al eliminar documento:', error);
      return false;
    }
  }


}
