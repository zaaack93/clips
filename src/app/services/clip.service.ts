import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import IClip from '../models/clip.model';

@Injectable({
  providedIn: 'root',
})
export class ClipService {
  clipCollection: AngularFirestoreCollection<IClip>;
  constructor(private db: AngularFirestore) {
    this.clipCollection = this.db.collection('clips');
  }
  createClip(clip: IClip): Promise<DocumentReference<IClip>> {
    return this.clipCollection.add(clip);
  }
}
