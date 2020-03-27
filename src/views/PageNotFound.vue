<template>
  <div class="custom-margin">
    <h1>
      Essa página não foi encontrada
    </h1>
    <b-button pill variant="warning" @click="goTo">
      Voltar para página inicial
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'page-not-found',
  methods: {
    goTo() {
       this.$router.push({ name: 'Home' });
    },
  },
};
</script>

<style>
.custom-margin {
  margin-top: 80px;
}
</style>
