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
  clipsList: IClip[] = [];
  isPending: Boolean = false;
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
  async getClipsList() {
    if (this.isPending) return;

    this.isPending = true;
    let query = this.clipCollection.ref.orderBy('timeStamp', 'desc');

    const { length } = this.clipsList;
    if (length) {
      const lastDocId = this.clipsList[length - 1].docID;
      const lastDoc = await this.clipCollection
        .doc(lastDocId)
        .get()
        .toPromise();
      query = query.startAfter(lastDoc);
    }

    let snapshot = await query.get();
    snapshot.forEach((clip) => {
      this.clipsList.push({ docID: clip.id, ...clip.data() });
    });
    this.isPending = false;
  }
}
