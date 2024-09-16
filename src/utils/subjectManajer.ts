import { Subject } from 'rxjs';

export class SubjectManager {
  subject$ = new Subject<string>();

  getSubject() {
    return this.subject$.asObservable();
  }

  setSubject(value: string) {
    this.subject$.next(value);
  }
}
