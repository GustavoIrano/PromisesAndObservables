import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/User';

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center" class="content">
      <h1>
        Welcome to {{title}}!
      </h1>
      <span style="display: block">{{ title }} app is running!</span>
      <img width="300" alt="Angular Logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==">
    </div>
    <h2>Here are some links to help you start: </h2>
    <ul>
      <li>
        <h2><a target="_blank" rel="noopener" href="https://angular.io/tutorial">Tour of Heroes</a></h2>
      </li>
      <li>
        <h2><a target="_blank" rel="noopener" href="https://angular.io/cli">CLI Documentation</a></h2>
      </li>
      <li>
        <h2><a target="_blank" rel="noopener" href="https://blog.angular.io/">Angular blog</a></h2>
      </li>
    </ul>
    
  `,
  styles: []
})
export class AppComponent implements OnInit {
  title = 'RXJS';

  ngOnInit(): void {

    // Using promisse

    this.myPromise('Gustavo').then(result => console.log(result));
    
    // Handling error in promise with catch
    this.myPromise('José')
      .then(result => console.log(result))
      .catch(erro => console.log(erro));

    // END - Using promisse

    // Using Observable

    //Error
    this.myObservable('')
      .subscribe(result => 
        console.log(result),
        erro => console.log(erro)
      );

    this.myObservable('Gustavo')
      .subscribe(result => console.log(result));

    // Using oberver
    const observer = {
      next: value => console.log('Next: ', value),
      error: error => console.log('Erro: ', error),
      complete: () => console.log('END')
    };

    //const obs = this.myObservable('Gustavo');  // ok
    
    //const obs = this.myObservable('Gustav');    // get error

    const obs = this.myObservableObject('Gustavo', 'gustavo@admin.com');  // ok

    const subs = obs.subscribe(observer);

    // Canceling the subscription
    setTimeout(() => {
      subs.unsubscribe();
    }, 3500);

    // END - Using oberver

    // END - Using Observable
  }

  myPromise(nome: string) : Promise<string>
  {
    return new Promise((resolve, reject) =>{
      if(nome==='Gustavo'){
        setTimeout(() =>{
          resolve('Be welcome ' + nome);
        }, 5000);
      }
      else{
        reject('Ops! You are not Gustavo');
      }
    })
  }

  myObservable(nome: string) : Observable<string>
  {
    return new Observable(subscriber => {

      if(nome === 'Gustavo'){

        subscriber.next('Hello! ' + nome);
        subscriber.next('Hello again! ' + nome);

        setTimeout(() =>{
          subscriber.next('Hello again hahahha! ' + nome);
        }, 5000);

        subscriber.complete();

      }
      else{
          subscriber.error('Ops! ERROR!!!');
      }
    });
  }

  myObservableObject(name: string, email: string) : Observable<User>
  {
    return new Observable(subscriber => {

      if(name === 'Gustavo'){

        let user = new User(name, email);

        setTimeout(() =>{
          subscriber.next(user);
        }, 1000);

        setTimeout(() =>{
          subscriber.next(user);
        }, 3000);

        setTimeout(() =>{
          subscriber.complete();
        }, 5000);

      }
      else{
          subscriber.error('Ops! ERROR!!!');
      }
    });
  }

}
