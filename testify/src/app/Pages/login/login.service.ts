import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { DatabaseService } from 'src/app/common/Database/database.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private db: DatabaseService) { }





}
