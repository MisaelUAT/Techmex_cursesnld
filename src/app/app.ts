import { Component, signal } from '@angular/core';
import { Router, NavigationEnd,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Techmex_cursesnld');
  private class_actually?: string;
  private listClass_backgrounds: Array<string> = [
    'bg_login'
  ]

  constructor(private router: Router, private activeRoute: ActivatedRoute){
    this.router.events.subscribe( 
      event=>{
        if (event instanceof NavigationEnd){
          let route = this.activeRoute;
            while(route.firstChild){
              route = route.firstChild
            }
            const background_class = route.snapshot.data["background_class"];
            
            if(this.class_actually){
              document.body.classList.remove(this.class_actually);
              this.class_actually = undefined;
            } else{
              this.listClass_backgrounds.forEach(classcss=>
                document.body.classList.remove(classcss)
              )
            };

            if (background_class) {
              document.body.classList.add(background_class)
              this.class_actually= background_class
            }
        }
      }
    )
  }
}
