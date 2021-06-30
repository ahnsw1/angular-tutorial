import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  heroes: Hero[] = [];

  // hero: Hero = {
  //   id: 1,
  //   name: 'WindStorm',
  // };

  //synchronous signature -> this will not work in a real application
  //동기화로 하면 UI가 멈춰버릴 수 있다.
  // getHeroes(): void {
  //   this.heroes = this.heroService.getHeroes();
  // }

  //RxJs - 비동기
  //this waits for the Observable to emit the array of heroes
  //전체 UI는 나오고, Observable이 hero를 보낼때 표시한다.
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) return ;
    this.heroService.addHero({ name } as Hero)
    .subscribe(hero => this.heroes.push(hero))
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
  // selectedHero?: Hero;
  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`)
  // }
}
