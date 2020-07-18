import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { TetrisStore, TetrisState } from './tetris.store';
import { GameState } from '@trungk18/interface/game-state';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TetrisQuery extends Query<TetrisState> {
  constructor(protected store: TetrisStore) {
    super(store);
  }

  get raw(): TetrisState {
    return this.getValue();
  }

  get locked(): boolean {
    return this.raw.locked;
  }

  get current() {
    return this.raw.current;
  }

  get next() {
    return this.raw.next;
  }

  get matrix() {
    return this.raw.matrix;
  }

  get canStartGame() {
    return this.raw.gameState !== GameState.Started;
  }

  get isPlaying() {
    return this.raw.gameState === GameState.Started;
  }

  get isEnableSound(): boolean {
    return !!this.raw.sound;
  }

  next$ = this.select('next');
  matrix$ = this.select('matrix');
  sound$ = this.select('sound');
  gameState$ = this.select('gameState');
  hasCurrent$ = this.select('current').pipe(map((x) => !!x));
  points$ = this.select('points');
  clearedLines$ = this.select('clearedLines');
  initLine$ = this.select('initLine');
  speed$ = this.select('speed');
}
