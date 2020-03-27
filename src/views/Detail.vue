<template>
  <div class="d-block">
    <navbar />
    <b-container>
      <detail :id="id" />
    </b-container>
  </div>
</template>

<script>
import Detail from '@/components/detail/Index.vue';
import Navbar from '@/components/navbar/Index.vue';

export default {
  components: {
    Detail,
    Navbar
  },
  props:{
    id:{
      type: String,
      default: ''
    }
  }
}
</script>
