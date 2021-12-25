import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private localstorage: Storage | null=null;
  constructor(private storage: Storage,private router: Router) {
    this.storage.create()
    .then(storage=>{
    this.localstorage =storage;
    });


  }

  public setItem(key: string, value: any) {
    this.localstorage?.set(key, value);
  }

  public getItem(key: string) {
    return this.localstorage?.get(key);
  }

  public removeItem(key: string) {
    this.localstorage?.remove(key);
  }

  public clearStorage() {
    this.localstorage?.clear();
  }


  public checkSession(){

    setTimeout(() => {

    this.getItem('UserInfo').then(obj=>{
      if(obj!=null && obj!=undefined){
        let userInfo=JSON.parse(obj);

        if(userInfo.UserId==undefined){
          this.clearStorage();
          this.router.navigate(['/', 'login'])
        }
        else{
          this.router.navigate(['/', 'home'])
        }
      }
      else{
        this.router.navigate(['/', 'login'])
      }
    })
    }, 1000);



  }

}
