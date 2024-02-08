import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  constructor() {}

  LogMessage(name: string, status: string) {
    console.log(
      `A new user with anme ${name} with status ${status} in added to user list`
    );
  }
}
