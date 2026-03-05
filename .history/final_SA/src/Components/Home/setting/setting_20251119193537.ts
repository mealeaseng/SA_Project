import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './setting.html',
  styleUrls: ['./setting.css'],
})
export class Setting implements OnInit {
  imgUpload: any;
  username: string = '';
  phone_num: string = '';
  email: string = '';
  password: string = '';
  comfirm_password: string = '';
  address: string = '';
  showTopup: boolean = false;

  constructor(private router: Router) {}
  isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  ngOnInit(): void {
    // if (!this.isLoggedIn) {
    //   this.router.navigate(['/login']);
    // }

    this.imgUpload = localStorage.getItem('imgUpload');
    this.username = localStorage.getItem('user') || '';
    this.phone_num = localStorage.getItem('phone_number') || '';
    this.email = localStorage.getItem('emailInput') || '';
    this.password = localStorage.getItem('password') || '';
    this.comfirm_password = localStorage.getItem('Com_password') || '';
    this.address = localStorage.getItem('address') || '';
  }

  saveChange() {
    localStorage.setItem('imgUpload', this.imgUpload);
    localStorage.setItem('user', this.username);
    localStorage.setItem('phone_number', this.phone_num);
    localStorage.setItem('emailInput', this.email);
    localStorage.setItem('password', this.password);
    localStorage.setItem('Com_password', this.comfirm_password);
    localStorage.setItem('address', this.address);

    alert('✅ Changes saved successfully!');
    location.reload();
  }

  remove() {
    if (confirm('Are you sure you want to remove your account data?')) {
      localStorage.clear();
      localStorage.setItem('isLoggedIn', 'false');
      alert('Account removed!');
      this.router.navigate(['/login']);
    }
  }

  imgChange() {
    this.showTopup = !this.showTopup;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => (this.imgUpload = reader.result);
      reader.readAsDataURL(file);
    }
  }

  upload() {
    localStorage.setItem('imgUpload', this.imgUpload);
    this.showTopup = false;
    location.reload();
    alert('Profile image updated!');
  }

  back() {
    this.imgUpload = null;
    this.showTopup = false;
  }

  toggleTopup() {
    this.showTopup = false;
  }
}
