import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-preview-gallery',
  templateUrl: './image-preview-gallery.component.html',
  styleUrls: ['./image-preview-gallery.component.scss']
})
export class ImagePreviewGalleryComponent implements OnInit {

  @Input() imgs: string[];
  currentImg: string;

  constructor() {}

  ngOnInit(): void {
    this.currentImg = this.imgs[0];
  }

  public selectImg( imgSelected ) {
    this.currentImg = imgSelected;
  }

}
