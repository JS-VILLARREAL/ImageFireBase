<template>
    <div class="">
        <div class="mb-3">
            <label for="formFile" class="form-label">Imagenes</label>
            <input @change="clickImage($event)" class="form-control" type="file" id="formFile" accept="image/*">
        </div>
        <button @click="uploadFile()" class="btn btn-primary" :disabled="!imageSelected" >
            Subir Imagenes
        </button>
    </div>
    <ProgressBar :progress="progress" />
    <hr>
    <div class="row">
        <div class="col-4" v-for="imagen in imagenes" :key="imagen.id">
            <img :src="imagen.url" alt="" class="img-fluid">
        </div>
    </div>

</template>

<script>
import { storage } from '../firebase/init.js'
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage"
import ProgressBar from './ProgressBar.vue'
import { v4 as uuidv4 } from 'uuid';

export default {
    data(){
        return {
            imagenes: [],
            image: null,
            progress: this.progress,
            imageSelected: false
        }
    },
    methods: {
        clickImage(e){
            this.image = e.target.files[0]
            this.imageSelected = true
            console.log(this.image)
        },
        uploadFile(){
            const storageRef = ref(storage, `scenas/${uuidv4()}`)
            const uploadTask = uploadBytesResumable(storageRef, this.image)
            uploadTask.on('state_changed', 
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    this.progress = progress
                    if (progress === 100) {
                        this.imageSelected = false
                    }
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                }, 
                (error) => {
                    console.log(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        this.imagenes.push({
                            id: uuidv4(),
                            url: downloadURL
                        })
                    });
                }
            );
        },
    },
    components: {
        ProgressBar, 
    }
}

</script>