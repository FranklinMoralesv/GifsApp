import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  

  private apiKey     : string = '2g241j5dbe1rNT0orBsGDX15E6kMk4p4';
  private urlService: string = 'https://api.giphy.com/v1/gifs';
  private _searchHistory : string[] = [];


  public results: Gif[] = [];

  constructor(private http:HttpClient) {
    this._searchHistory = JSON.parse(localStorage.getItem('searchHistory')!) || [];
    this.results = JSON.parse(localStorage.getItem('results')!) || [];

   }

  get searchHistory() {
    return [...this._searchHistory];
  }

  showAlert(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Gif no encontrado',
      confirmButtonColor:'black'
    });
  }

  searchGifs( query: string = '' ) {


     const params = new HttpParams()
           .set('api_key', this.apiKey)
           .set('limit', '10')
           .set('q', query );

    this.http.get<SearchGifsResponse>(`${ this.urlService }/search`, { params } )
      .subscribe(  resp  => {
  
        if(resp.data.length==0){
          console.log('No hay resultado');
          this.showAlert();
        }else{
          
          query = query.trim().toLocaleLowerCase();//colocarlos todos en minusculas para poder compararlos
          
          if( !this._searchHistory.includes(query)) {
          
          this._searchHistory.unshift( query );//Agregar al comienzo

          this._searchHistory = this._searchHistory.splice(0,10);// maximo 10 elementos

          localStorage.setItem('searchHistory', JSON.stringify( this._searchHistory ));
          }




          this.results = resp.data;
          console.log('si hay');
          localStorage.setItem('results', JSON.stringify( this.results )  );
        }
      });

  }
}
