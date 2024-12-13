import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Firestore } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {

  user: string | undefined | null
  userID: string | null = null
  formGroup: FormGroup
  profilePhoto: string | undefined;
  constructor(public photoService: PhotoService,
    private userService: UserService,
    private firestore: Firestore,
    private auth: Auth
  ) {
    this.formGroup = new FormGroup({
      user: new FormControl(),
      name: new FormControl(),
      age: new FormControl(),
      description: new FormControl(),
    })
  }


  ngOnInit() {





    // this.userService.getActualID().subscribe((users) => {
     

    //   const userIdActual = getAuth().currentUser?.uid; // Cambia esto por el ID del usuario logueado
    //   console.log('userIdActual', userIdActual)
    //   const existe = users.some(user => {

    //     console.log('Revisando user.id:', user.id); // Aquí ves el valor de user.id


    //     if (user.id === userIdActual) {
    //       console.log('El usuario está en la lista.');
    //     } else {
    //       console.log('El usuario no está en la lista.');
    //     }

    //   })


    // })

  

  }




  addPhotoToGallery() {
    console.log("Funciona")
    this.photoService.AgregarPhotoGaleria();
  }


  updateUser() {

    const userID = this.auth.currentUser?.uid; // Obtén el UID 
    console.log('updateUser| USERID: ', userID)

    if (!userID) {
      console.log('Error: No se pudo obtener el UID del usuario actual.');
      console.log(this.userID)

      return; // Salir si no hay UID

    }
    console.log('funcion Update');

    const updatedUserData = this.formGroup.value;
    console.log(updatedUserData);

    this.userService.updateUser(userID, updatedUserData)
  }








}
