<template>
    <div class="">
        <div class="mb-3">
            <label for="formFile" class="form-label">Imagenes</label>
            <input @change="clickImage($event)" class="form-control" type="file" id="formFile" accept="image/*">
        </div>
        <input @click="uploadFile($event)" type="submit" class="btn btn-primary" value="Subir Imagenes">
    </div>
    <ProgressBar :progress="progress" />

</template>

<script>
import { storage } from '../firebase/init.js'
import { ref, uploadBytesResumable } from "@firebase/storage"
import ProgressBar from './ProgressBar.vue'
import { v4 as uuidv4 } from 'uuid';

export default {
    data(){
        return {
            imagenes: [],
            image: null,
            progress: this.progress
        }
    },
    methods: {
        clickImage(e){
            this.image = e.target.files[0]
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
                    if (progress == 100) {
                        this.progress = 0 
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
                    console.log('Upload is complete');
                }
            );
        },
    },
    components: {
        ProgressBar
    }
}


</script>