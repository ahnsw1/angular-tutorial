import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  search(term: string): void {
    //next: Observable 구독자에게 데이터를 전달한다
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),      //wait 300ms after each keystroke before considering the term
      distinctUntilChanged(), //ignore new term if same as previous term
      switchMap((term: string) => this.heroService.searchHeroes(term)), //switch to new search observable each time the term changes
    );
  }

}

/* 
1. 생성 Observable.create() 
2. 구독 Observable.subscribe()
3. 실행 observer.next() 이벤트를 구독하고 있는 대상에게 값을 전달한다
4. 구독 해제 observer.complete()
            Observable.unsubscribe()
*/