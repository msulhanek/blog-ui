import {Component, OnInit, ViewChild} from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import {PostPayload} from '../post-create/post-payload';
import {PostCreateService} from '../post-create.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'

})
export class HomeComponent implements OnInit {

  images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/1200/600`);
  posts: PostPayload[];
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  constructor(private postService: PostCreateService) {
  }

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(data => {
      this.posts = data;
    });
  }

}
