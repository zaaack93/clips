import { map, switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
  QuerySnapshot,
} from '@angular/fire/compat/firestore';
import IClip from '../models/clip.model';
import { tap, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClipService {
  clipCollection: AngularFirestoreCollection<IClip>;
  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
    this.clipCollection = this.db.collection('clips');
  }
  createClip(clip: IClip): Promise<DocumentReference<IClip>> {
    return this.clipCollection.add(clip);
  }
  getUserClips() {
    //switch map should be also send a observable
    return this.auth.user.pipe(
      switchMap((user) => {
        if (!user) {
          return of([]);
        }
        const query = this.clipCollection.ref.where('uid', '==', user.uid);
        return query.get();
      }),
      map((snapshot) => {
        return (snapshot as QuerySnapshot<IClip>).docs;
      })
    );
  }
}
