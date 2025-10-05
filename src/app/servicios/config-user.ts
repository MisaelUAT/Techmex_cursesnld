import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
// import { map } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigUser {
   URL!: any;
  registros: any;
 constructor(private firestore: Firestore) {}

  Read_Coleccion(coleccion: string): Observable<any[]> {
    const ref = collection(this.firestore, coleccion);
    return collectionData(ref, { idField: 'id' });
  }
}
