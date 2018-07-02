<template>
  <span>
    <button v-if="!post.meta.isLiked" @click="$emit('like')" type="button" class="w3-button w3-text-theme"><i class="far fa-thumbs-up"></i>  Like ({{post.meta.numLikes}})</button> 
    <button v-if="post.meta.isLiked" @click="$emit('unlike')" type="button" class="w3-button w3-text-theme"><i class="fa fa-thumbs-up"></i>  Unlike ({{post.meta.numLikes}})</button> 
  </span>
</template>

<script>
  import LikeButton from './LikeButton.ts'
  export default LikeButton
</script>
