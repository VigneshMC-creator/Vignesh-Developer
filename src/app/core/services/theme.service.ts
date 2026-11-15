import { Injectable, signal } from '@angular/core';
export type Theme = 'light' | 'dark';
@Injectable({ providedIn: 'root' })
export class ThemeService {
 private readonly storageKey='vignesh-portfolio-theme';
 private readonly currentTheme=signal<Theme>(this.readInitialTheme());
 readonly theme=this.currentTheme.asReadonly();
 constructor(){this.applyTheme(this.currentTheme())}
 toggle():void{this.setTheme(this.currentTheme()==='dark'?'light':'dark')}
 setTheme(theme:Theme):void{
  this.currentTheme.set(theme);this.applyTheme(theme);
  try{localStorage.setItem(this.storageKey,theme)}catch{/* Theme remains active for this session. */}
 }
 private readInitialTheme():Theme{
  try{return localStorage.getItem(this.storageKey)==='dark'?'dark':'light'}catch{return 'light'}
 }
 private applyTheme(theme:Theme):void{
  if(typeof document==='undefined')return;
  document.documentElement.dataset['theme']=theme;
  const meta=document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if(meta)meta.content=theme==='dark'?'#111713':'#f4f6f2';
 }
}
