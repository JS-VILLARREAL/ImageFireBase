<template>
    <hr>
  <div class="progress">
    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" :style="`width:${props.progress}%`"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  progress: Number
})

</script>