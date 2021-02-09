import { Injectable, OnInit } from "@angular/core";
import { AuthService } from "./auth/auth.service";


////// TODO //////

// Test this providing in App module and in Shopping list module

@Injectable({ providedIn: 'root' })
export class LoggingService {
  lastLog: string;

  printLog(message: string) {
    console.log(message);
    console.log(this.lastLog);
    this.lastLog = message;
  }
}
