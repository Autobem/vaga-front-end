<template>
      <b-row class="justify-content-center">
        <b-col cols="8" class="wrap-index">
              <b-overlay :show="loading" rounded="sm">

              <b-table striped hover :items="pokemons" :fields="fields">

                <template v-slot:cell(name)="data">
                  <router-link :to="{ name: 'Detail', params: {id: getID(data.item.url) }}">
                      {{ data.item.name | firstName }}
                  </router-link>
                </template>

              </b-table>
              </b-overlay>
                      
        <Paginate
          :totalPages="pagination.totalPages"
          :activePage="pagination.currentPage"
          @to-page="toPage"
          @per-page="perPage"
          />
        </b-col>
      </b-row>
</template>
<script>
import PokemonService from "@/services/resources/PokemonService";
import Paginate from "@/components/shared/Paginate";

const service = PokemonService.build();

export default {
  name: 'Login',
  components:{
    Paginate
  },
  data () {
    return {
      loading: true,
      pokemons: [],
      fields: [
          {
            key: 'name',
            label: 'Nome',
            sortable: true
          }
      ],
      pagination:{
        totalPages: 1,
        currentPage: 1,
        perPage: 20
      }
    }
  },
  methods: {
     toPage(page){
      this.pagination.currentPage = page;
      this.fetchPokemons();
    },
    perPage(qtd){
      this.pagination.currentPage = 1;
      this.pagination.perPage = qtd;

      this.fetchPokemons();
    },
    fetchPokemons(){

      let filters = {
        offset: this.pagination.currentPage * this.pagination.perPage,
        limit: this.pagination.perPage
      };
      this.pagination.totalPages = 1;
      this.loading = true;

      service
        .search(filters)
        .then(response => {
            this.pokemons = response.results;
            this.pagination.totalPages = response.count / this.pagination.perPage;
            this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });

    },
    getID(url){
        return url.split('/')[url.split('/').length - 2];
    }
  },
  filters:{
      firstName(string){
            return string.charAt(0).toUpperCase() + string.slice(1);
      }
  },
  mounted(){
    this.fetchPokemons();
  }

  }
</script>

<style scoped lang="scss">
.wrap-index{
  background: #fff;
  border-radius: 15px;
}
</style>