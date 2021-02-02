import { Component, OnInit, ViewChild,ElementRef} from '@angular/core';

@Component({
  selector: 'app-btn-action',
  templateUrl: './btn-action.component.html',
  styleUrls: ['./btn-action.component.scss']
})
export class BtnActionComponent implements OnInit {

  constructor() { }
  flag: boolean= false;
  @ViewChild('menuAct') menu: ElementRef;
  @ViewChild('X') x: ElementRef;
  @ViewChild('bars') bars: ElementRef;

  ngOnInit(): void {
     
  } 
  handleBtn(){
      if(!this.flag){

        this.bars.nativeElement.classList.remove('rotar-a');
        this.bars.nativeElement.classList.remove('active');
        this.bars.nativeElement.classList.add('rotar-d');
        
        this.x.nativeElement.classList.remove('rotar-d');
        this.x.nativeElement.classList.add('rotar-a');
        this.x.nativeElement.classList.add('active');				
        this.flag=!this.flag;
        
        }else{

          this.bars.nativeElement.classList.remove('rotar-d');
          this.bars.nativeElement.classList.add('rotar-a');
          this.bars.nativeElement.classList.add('active');
          
          this.x.nativeElement.classList.remove('rotar-a');	
          this.x.nativeElement.classList.remove('active');				

          this.x.nativeElement.classList.add('rotar-d');
          this.flag=!this.flag;
          
          }
        
}
}
