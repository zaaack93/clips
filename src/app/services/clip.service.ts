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
import { tap, of, BehaviorSubject, combineLatest, forkJoin } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class ClipService {
  clipCollection: AngularFirestoreCollection<IClip>;
  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
    private storage: AngularFireStorage
  ) {
    this.clipCollection = this.db.collection('clips');
  }
  createClip(clip: IClip): Promise<DocumentReference<IClip>> {
    return this.clipCollection.add(clip);
  }
  updateClip(title: string, id: string) {
    return this.clipCollection.doc(id).update({ title });
  }
  async deletClip(clip: IClip) {
    if (clip.url) await this.storage.storage.refFromURL(clip.url).delete();
    if (clip.screenShotUrl)
      await this.storage.storage.refFromURL(clip.screenShotUrl).delete();
    await this.clipCollection.doc(clip.docID).delete();
  }
  getUserClips(sort$: BehaviorSubject<string>) {
    //switch map should be also send a observable
    return combineLatest([this.auth.user, sort$]).pipe(
      switchMap((values) => {
        const [user, sort] = values;
        if (!user) {
          return of([]);
        }
        const query = this.clipCollection.ref
          .where('uid', '==', user.uid)
          .orderBy('timeStamp', sort === '1' ? 'desc' : 'asc');
        return query.get();
      }),
      map((snapshot) => {
        return (snapshot as QuerySnapshot<IClip>).docs;
      })
    );
  }
}
