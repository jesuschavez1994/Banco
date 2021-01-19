import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  @ViewChild('ToastRef') ToastRef: ElementRef;
  @Input() data = {
    title: '',
    colors: {
      color: '#ffffff',
      background: '#1d1d1bc2'
    }
  };
  showToast = false;

  constructor() { }

  ngOnInit(): void {
  }

  onNoCLick() {
    document.addEventListener('click', (e) => {

      const isClickInside = this.ToastRef.nativeElement.contains(e.target);

      if (!isClickInside) {
        this.showToast = false;
      }

    });
  }

  open( data, colors = { color: '#ffffff', background: '#1d1d1bc2'} ) {

    this.showToast = true;

    this.data = {
      title: data,
      colors
    };

    setTimeout(() => {
      this.showToast = false;
    }, 3000);

  }

  close() {
    this.showToast = false;

  }
}
