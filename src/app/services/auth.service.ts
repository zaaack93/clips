import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { map, delay, filter, switchMap } from 'rxjs/operators';
import IUser from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userCollection: AngularFirestoreCollection<IUser>;
  public isAuthenticated$: Observable<boolean>;
  public isAuthenticatedWithDelay$: Observable<boolean>;
  private redirect:boolean=false;

  constructor(private auth: AngularFireAuth, private db: AngularFirestore,private afauth: AngularFireAuth,
    private router:Router,private route:ActivatedRoute) {
    this.userCollection = db.collection('users');
    this.isAuthenticated$ = auth.user.pipe(map((user) => !!user));
    this.isAuthenticatedWithDelay$ = auth.user.pipe(
      map((user) => !!user),
      delay(1000)
    );
    //we filter the event with navigation end because we want to grab the route active data without any unaxcepted behaviour // first child get only the the first level of three without geet the nested root
    //?? this new feature check if the value if null of undefined else retourne the right value
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        map((e) => this.route.firstChild),
        switchMap(router=>router?.data ??  of({}))
      )
      .subscribe(data=>{
        this.redirect=data['authOnly'] ?? false
      });
  }
  async createUser(userData: IUser) {
    if (!userData.password) throw new Error('Password is not provided');
    const userCred = await this.auth.createUserWithEmailAndPassword(
      userData.email,
      userData.password
    );
    if (!userCred.user) throw new Error("User can't be found");
    await this.userCollection.doc(userCred.user.uid).set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber,
    });

    await userCred.user.updateProfile({
      displayName: userData.name,
    });
  }
  async logout(event?: Event) {
    if(event)
      event.preventDefault();


    await this.afauth.signOut();
    if(this.redirect){
      await this.router.navigateByUrl('/')
    }
  }
}
