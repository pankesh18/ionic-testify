import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private localstorage: Storage | null=null;
  constructor(private storage: Storage) {
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


}
