<template>
  <div class="d-block wrap-body">
    <navbar />
    <b-jumbotron header="Pokemon" lead="Conheça todos os pokemons">
    </b-jumbotron>

    <index />
  </div>
</template>

<script>
import Index from '@/components/index/Index.vue';
import Navbar from '@/components/navbar/Index.vue';

export default {
  components: {
    Index,
    Navbar
  }
}
</script>

<style scoped lang="scss">
.wrap-body{
  background: #ddd;
}
</style>
