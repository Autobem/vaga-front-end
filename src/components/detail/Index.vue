<template>
    <b-container class="body">
        <b-row > 
          <b-col >
            <div class="title">{{ pokemon.name | firstName }}</div>
          </b-col>
        </b-row>

        <transition name="fade">
          <b-row v-show="!loading">
    
            <b-col cols="4" class="wrap-image mr-2">
              <img :src="pokemon.sprites.front_default" class="img-fluid" />
            </b-col>

            <b-col cols="7" class="wrap-info" >
              <b-row>
                <b-col cols="6">
                  <span class="label">Altura</span>
                  <span class="value">{{ pokemon.height }}</span>
                </b-col>

                <b-col cols="6">
                  <span class="label">Peso</span>
                  <span class="value">{{ pokemon.weight }}</span>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="6">
                  <span class="label">Abilidades</span>
                  <ul class="abilities">  
                    <li v-for="item in pokemon.abilities" :key="item.ability.name" class="value">{{ item.ability.name }}</li>
                  </ul>
                </b-col>
              </b-row>
            </b-col>
            </b-row>
        </transition>
    </b-container>
</template>
<script>
import PokemonService from "@/services/resources/PokemonService";

const service = PokemonService.build();

export default {
  name: 'Login',
  props:{
    id:{
      type: String,
      default: ''
    }
  },
  data () {
    return {
      pokemon: {
        name: '',
        sprites:{
          front_default: ''
        }
      },
      loading: true
    }
  },
  methods: {
    load(){
      
      let data = {
        id: this.id
      };

      service
        .read(data)
        .then(response => {
            this.pokemon = response;
            this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });

    }
  },
  filters:{
      firstName(string){
            return string.charAt(0).toUpperCase() + string.slice(1);
      }
  },
  mounted(){
    this.load();
  }

  }
</script>

<style scoped lang="scss">


.wrap-info{
  background: #333;
  padding: 20px;
  border-radius: 10px;
  text-align: left;

  .label{
    display: block;
    font-size: 1.5em;
    color: #0099ff;
  }

  .value{
    font-size: 1.2em;
    color: #fff;
  }

  .abilities{
    list-style: none;
    padding: 0;
    margin: 0;

    li{
      display: block;
      padding: 5px;
      
    }
  }
}

.wrap-image{
  border: 1px #ddd solid;
  background: #ddd;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  img{
    width: 150px;
  }
}

.title{
  font-size: 3em;
  font-weight: 100;
  padding: 10px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>