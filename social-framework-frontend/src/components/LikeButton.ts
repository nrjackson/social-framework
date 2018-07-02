import Component from "vue-class-component";
import Vue from "vue";

@Component({
  name: 'likeButton',
  props: ['post'],
})
export default class LikeButton extends Vue {
}
