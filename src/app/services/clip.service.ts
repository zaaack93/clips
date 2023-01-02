import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import IClip from '../models/clip.model';

@Injectable({
  providedIn: 'root'
})
export class ClipService {
  clipCollection: AngularFirestoreCollection<IClip>;
  constructor(private db: AngularFirestore) {
    this.clipCollection=this.db.collection('clips')
  }
  async createClip(clip:IClip){
    await this.clipCollection.add(clip)
  }

}
