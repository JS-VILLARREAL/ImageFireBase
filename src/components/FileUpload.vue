<template>
    <div class="">
        <div class="mb-3">
            <label for="formFile" class="form-label">Imagenes</label>
            <input @change="clickImage($event)" class="form-control" type="file" id="formFile" accept="image/*">
        </div>
        <input @click="uploadFile()" type="submit" class="btn btn-primary" value="Subir Imagenes">
    </div>
    <div class="mb-3">
        <ProgressBar :progress="progress"/>
    </div>

</template>

<script>
import { ref } from 'vue'
import {uploadFile} from '../firebase/init.js'
import ProgressBar from './ProgressBar.vue'

export default {
    data() {
        return {
            images: [],
            image: null,
            progress: ref(0)

        }
    },
    components: {
        ProgressBar
    },
    methods: {
        clickImage(e){
            this.image = e.target.files[0];
            console.log(this.image);
        },
        async uploadFile(){
            await uploadFile(this.image);
            
        }
    }
}

</script>