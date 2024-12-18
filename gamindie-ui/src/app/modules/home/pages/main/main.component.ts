import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from '../../components/menu/menu.component';
import { CommentService } from '../../../../services/services';
import { Comment} from "../../../../services/models"
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, MenuComponent, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {

  commentsList: Comment[] = [];

  constructor(private commentService: CommentService){

  }

  getComments() {
    this.commentService.getAllComments().subscribe(
    {
            next: (response) => {
              this.commentsList = response;
            },
            error: (error) => {
              console.log(error.error);
            }
          }
  );
  }
}
