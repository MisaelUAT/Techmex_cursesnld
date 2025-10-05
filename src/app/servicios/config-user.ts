import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigUser {
   URL!: any;
  registros: any;

   constructor(private db: AngularFirestore) { }

  Read_Coleccion(Coleccion: string){
    return this.db
      .collection(Coleccion)
      .snapshotChanges()
      .pipe(
        map((response) =>
          response.map((doc) => ({
            id: doc.payload.doc.id,
            ...(doc.payload.doc.data() || {})
          }))
        )
      );
  }
}
