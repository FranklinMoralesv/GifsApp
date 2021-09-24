import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {



  get searchHistory(){
    return this.gifService.searchHistory;
  }

  search(query:string){
    this.gifService.searchGifs(query);
  }

  constructor(private gifService:GifsService) { }


  ngOnInit(): void {
    
  }

}
