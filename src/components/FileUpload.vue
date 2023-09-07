<template>
    <div class="">
        <div class="mb-3">
            <label for="formFile" class="form-label">Imagenes</label>
            <input @change="uploadFile($event)" class="form-control" type="file" id="formFile" accept="image/*">
        </div>
        <input @click="uploadFile()" type="submit" class="btn btn-primary" value="Subir Imagenes">
    </div>
    <div class="mb-3">
        <ProgressBar :progress="progress"/>
    </div>

</template>

<script setup>
import { ref } from 'vue'
import {uploadFile, storage, ref, uploadBytesResumable} from '../firebase/init.js'
import ProgressBar from './ProgressBar.vue'
import { v4 as uuidv4 } from 'uuid';

const image = ref(null);
const progress = ref(0);


function clickImage(e){
    this.image = e.target.files[0];
    console.log(this.image);
}


function uploadFile(e) {
    const storageRef = ref(storage, `scenas/${uuidv4()}`);
    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);

    // uploadBytes(storageRef, file).then((snapshot) => {
    //   console.log(snapshot);
    // });
    uploadTask.on('state_changed',
        (snapshot) => {
        progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case 'paused':
            console.log('Upload is paused');
            break;
            case 'running':
            console.log('Upload is running');
            break;
        }
        }
    );
}
</script>