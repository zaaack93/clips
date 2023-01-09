import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import firebase from 'firebase/compat/app';
@Pipe({
  name: 'fbTimeStamp'
})
export class FbTimeStampPipe implements PipeTransform {
  constructor(private datePip :DatePipe){}
  transform(value: firebase.firestore.FieldValue): unknown {
    const date=(value as firebase.firestore.Timestamp).toDate();
    const dateTransformed =this.datePip.transform(date,'mediumDate');
    return dateTransformed;
  }

}
