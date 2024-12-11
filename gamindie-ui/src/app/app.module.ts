import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
    AppComponent
    ], // Declare components
    imports: [
    BrowserModule,
    HttpClientModule, // Import HttpClientModule
    RouterModule.forRoot([]), // Setup routes if necessary
    ],
    providers: [
        HttpClient
    ], // Provide services
    bootstrap: [AppComponent], // Bootstrapping the root component
})
export class AppModule {}
