import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PostCardComponent } from '../../../core/components/post-card/post-card.component';
import { Post } from '../../../core/services/models';

@Component({
  selector: 'app-myfeed',
  imports:[CommonModule, FormsModule, AngularSvgIconModule, PostCardComponent],
  templateUrl: './myfeed.component.html',
  styleUrl: './myfeed.component.scss'
})
export class MyfeedComponent {

  constructor(private route: ActivatedRoute) { }

  posts:Post[] = [
     {
       id: 1,
       content: 'This is an example post content that exceeds the maximum length for display purposes.This is an example post content that exceeds the maximum length for display purposes.This is an example post content that exceeds the maximum length for display purposes.This is an example post content that exceeds the maximum length for display purposes.',
       createdBy: 1,
       createdData: '2021-09-01',
       lastModifiedBy: 1,
       lastModifiedDate: '2021-09-01',
       likes: [],
       owner: {
         id: 1,
         email: 'johnwill22@gmail.com',
         firstname: 'John',
         lastname: 'Will',
         username: 'johnwill22',
         password: 'password',
         lastModifiedDate: '2021-09-01',
         profilePicture: './Imgs/postImgs.JPG'
       },
       tags: ['tag1', 'tag2'],
       attachments: [
         {
           id: 1,
           createdBy: 1,
           createdData: '2021-09-01',
           lastModifiedBy: 1,
           lastModifiedDate: '2021-09-01',
           metadata: 'metadata',
           name: 'attachment1',
           type: 'image',
           url: './Imgs/postImgs.JPG'
         }
       ],
       comments: [
         {
           id:1,
           content: 'This is a comment',
           createdBy: 1,
           createdData: '2021-09-01',
           lastModifiedBy: 1,
           lastModifiedDate: '2021-09-01',
           owner: {
             id: 1,
             email: 'jogonwil@gmail.com',
             firstname: 'John',
             lastname: 'Will',
             username: 'johnwill22',
             profilePicture: "./Imgs/postImgs.JPG"
           },
           replies: [
             {
               content: 'This is a reply This is a reply This is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a reply',
               createdBy: 1,
               createdData: '2021-09-01',
               id: 2,
               lastModifiedBy: 1,
               lastModifiedDate: '2021-09-01',
               owner: {
                 id: 1,
                 email: 'jogonwil@gmail.com',
                 firstname: 'John',
                 lastname: 'Will',
                 username: 'johnwill22',
                 profilePicture: './Imgs/postImgs.JPG'
               },
             },
             {
               content: 'This is a reply This is a reply This is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a replyThis is a reply',
               createdBy: 1,
               createdData: '2021-09-01',
               id: 2,
               lastModifiedBy: 1,
               lastModifiedDate: '2021-09-01',
               owner: {
                 id: 1,
                 email: 'jogonwil@gmail.com',
                 firstname: 'John',
                 lastname: 'Will',
                 username: 'johnwill22',
                 profilePicture: './Imgs/postImgs.JPG'
               },
             }, {
               content: 'This is a reply',
               createdBy: 1,
               createdData: '2021-09-01',
               id: 2,
               lastModifiedBy: 1,
               lastModifiedDate: '2021-09-01',
               owner: {
                 id: 1,
                 email: 'jogonwil@gmail.com',
                 firstname: 'John',
                 lastname: 'Will',
                 username: 'johnwill22',
                 profilePicture: './Imgs/postImgs.JPG'
               },
             }, {
               content: 'This is a reply',
               createdBy: 1,
               createdData: '2021-09-01',
               id: 2,
               lastModifiedBy: 1,
               lastModifiedDate: '2021-09-01',
               owner: {
                 id: 1,
                 email: 'jogonwil@gmail.com',
                 firstname: 'John',
                 lastname: 'Will',
                 username: 'johnwill22',
                 profilePicture: './Imgs/postImgs.JPG'
               },
             }, {
               content: 'This is a reply',
               createdBy: 1,
               createdData: '2021-09-01',
               id: 2,
               lastModifiedBy: 1,
               lastModifiedDate: '2021-09-01',
               owner: {
                 id: 1,
                 email: 'jogonwil@gmail.com',
                 firstname: 'John',
                 lastname: 'Will',
                 username: 'johnwill22',
                 profilePicture: './Imgs/postImgs.JPG'
               },
             }, {
               content: 'This is a reply',
               createdBy: 1,
               createdData: '2021-09-01',
               id: 2,
               lastModifiedBy: 1,
               lastModifiedDate: '2021-09-01',
               owner: {
                 id: 1,
                 email: 'jogonwil@gmail.com',
                 firstname: 'John',
                 lastname: 'Will',
                 username: 'johnwill22',
                 profilePicture: './Imgs/postImgs.JPG'
               },
             }, {
               content: 'This is a reply',
               createdBy: 1,
               createdData: '2021-09-01',
               id: 2,
               lastModifiedBy: 1,
               lastModifiedDate: '2021-09-01',
               owner: {
                 id: 1,
                 email: 'jogonwil@gmail.com',
                 firstname: 'John',
                 lastname: 'Will',
                 username: 'johnwill22',
                 profilePicture: './Imgs/postImgs.JPG'
               },
             }, {
               content: 'This is a reply',
               createdBy: 1,
               createdData: '2021-09-01',
               id: 2,
               lastModifiedBy: 1,
               lastModifiedDate: '2021-09-01',
               owner: {
                 id: 1,
                 email: 'jogonwil@gmail.com',
                 firstname: 'John',
                 lastname: 'Will',
                 username: 'johnwill22',
                 profilePicture: './Imgs/postImgs.JPG'
               },
             }, {
               content: 'This is a reply',
               createdBy: 1,
               createdData: '2021-09-01',
               id: 2,
               lastModifiedBy: 1,
               lastModifiedDate: '2021-09-01',
               owner: {
                 id: 1,
                 email: 'jogonwil@gmail.com',
                 firstname: 'John',
                 lastname: 'Will',
                 username: 'johnwill22',
                 profilePicture: './Imgs/postImgs.JPG'
               },
             }, {
               content: 'This is a reply',
               createdBy: 1,
               createdData: '2021-09-01',
               id: 2,
               lastModifiedBy: 1,
               lastModifiedDate: '2021-09-01',
               owner: {
                 id: 1,
                 email: 'jogonwil@gmail.com',
                 firstname: 'John',
                 lastname: 'Will',
                 username: 'johnwill22',
                 profilePicture: './Imgs/postImgs.JPG'
               },
             },
           ],
           
         }
       ]
     },
   ]
}
