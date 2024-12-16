import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { collection, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {

  username: string | undefined | null
  userID: string | null = null
  formGroup: FormGroup
  profilePhoto: string | undefined;





  constructor(public photoService: PhotoService,
    private userService: UserService,
    private firestore: Firestore,
    private auth: Auth
  ) {
    this.formGroup = new FormGroup({
      username: new FormControl(),
      name: new FormControl(),
      age: new FormControl(),
      carrera: new FormControl(),
      description: new FormControl(),
    })
  }


async  ngOnInit() {



  

  }




  addPhotoToGallery() {
    console.log("Funciona")
    this.photoService.AgregarPhotoGaleria();
  }






  updateUser() {

    const userID = this.auth.currentUser?.uid; // Obtiene el ID del campo 

    if (!userID) {
      console.log('Error: No se pudo obtener el UID del usuario actual.');
     

      return; // Salir si no hay UID

    }


    const updatedUserData = this.formGroup.value;
    this.userService.updateUser(userID, updatedUserData)
   
  }








}
