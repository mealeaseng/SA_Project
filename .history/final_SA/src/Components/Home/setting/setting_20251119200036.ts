import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

  userId = localStorage.getItem('userId') || '';
  // EXACT same key as login page

  constructor(private router: Router, private http: HttpClient) {}
  isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  ngOnInit(): void {
    // if (!this.userId) {
    //   this.router.navigate(['/login']);
    //   return;
    // }

    // 🔥 Load user data from API instead of localStorage
    this.http.get(`http://localhost:3000/api/login/${this.userId}`).subscribe((user: any) => {
      this.imgUpload = user.profile_img || '';
      this.username = user.name_user || '';
      this.phone_num = user.phone_number || '';
      this.email = user.email || '';
      this.address = user.address || '';
      this.password = user.password;
      this.comfirm_password = user.password;
    });
  }

  saveChange() {
    const updatedData = {
      profile_img: this.imgUpload,
      name_user: this.username,
      phone_number: this.phone_num,
      email: this.email,
      password: this.password,
      address: this.address,
    };

    if (this.password === this.comfirm_password) {
      // 🔥 Save changes to API
      this.http.put(`http://localhost:3000/api/login/${this.userId}`, updatedData).subscribe(() => {
        alert('✅ Changes saved successfully!');
      });
    } else {
      alert('comfirm the passord!');
    }
  }

  remove() {
    if (confirm('Are you sure you want to remove your account data?')) {
      this.http.delete(`http://localhost:3000/api/login/${this.userId}`).subscribe(() => {
        localStorage.clear();
        localStorage.setItem('isLoggedIn', 'false');
        alert('Account removed!');
        this.router.navigate(['/login']);
      });
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
    const updatedImg = { profile_img: this.imgUpload };

    // 🔥 Update only image
    this.http.put(`http://localhost:3000/api/login/${this.userId}`, updatedImg).subscribe(() => {
      this.showTopup = false;
      alert('Profile image updated!');
      location.reload();
    });
  }

  back() {
    this.showTopup = false;
  }

  toggleTopup() {
    this.showTopup = false;
  }
}
