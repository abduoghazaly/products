import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(public userService: UserService) {}
}
