<template>
  <b-row class="pt-3">
    <b-col>
      <b-row>
        <b-col cols="12">
          <div class="d-flex justify-content-center">
            <div>
              <li
                v-if="activePage > 1"
                class="d-flex justify-content-center align-items-center prev-next number-control"
                @click="toPage(activePage-1)"
              >&#60;</li>
            </div>
            <div class="akkurat-regular ">
              <ul class="pagination">
                <li
                  class="d-flex justify-content-center align-items-center number-control"
                  :class="{active: n==activePage, disabled: n <0}"
                  v-for="n in pages"
                  :key="n"
                  @click="toPage(n)"
                >
                  <span v-if="n > 0">{{n}}</span>
                  <span v-else>...</span>
                </li>
              </ul>
            </div>
            <div>
              <li
                v-if="activePage < totalPages"
                class="d-flex justify-content-center align-items-center prev-next number-control"
                @click="toPage(activePage+1)"
              >&#62;</li>
            </div>

          <div v-if="totalPages > 1 || selectedPerPage != 20" class="d-flex ml-3 wrap-pages">
            <b-form-select
              class="radius-theme akkurat-regular"
              v-model="selectedPerPage"
              :options="perPageOptions"
              @change="perPage"
            ></b-form-select>
          </div>

          </div>
        </b-col>

  

      </b-row>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "custom-paginate",
  props: {
    activePage: {
      type: Number,
      default: () => {
        return 1;
      }
    },
    totalPages: {
      type: Number,
      default: () => {
        return 1;
      }
    }
  },
  data: () => ({
    selectedPerPage: 20,
    perPageOptions: [
      { text: "20 por página", value: 20 },
      { text: "50 por página", value: 50 },
      { text: "100 por página", value: 100 }
    ]
  }),
  computed: {
    pages: function() {
      let pages = Array.from({ length: this.totalPages }, (v, k) => k + 1);

      if (this.totalPages <= 12) {
        return pages;
      } else if (
        this.activePage <= 6 ||
        this.activePage >= this.totalPages - 5
      ) {
        pages.splice(6, this.totalPages - 12);

        pages.splice(6, 0, -1);

        return pages;
      } else if (this.activePage == 7) {
        pages.splice(7, this.totalPages - 12);
        pages.splice(7, 0, -1);

        return pages;
      } else if (this.activePage == this.totalPages - 6) {
        pages.splice(5, this.totalPages - 12);
        pages.splice(5, 0, -1);

        return pages;
      } else {
        pages.splice(5, this.totalPages - 10);
        pages.splice(5, 0, -1);
        pages.splice(5, 0, this.activePage);
        pages.splice(5, 0, -2);
        return pages;
      }
    }
  },
  methods: {
    perPage() {
      this.$emit("per-page", this.selectedPerPage);
    },
    toPage(page) {
      if (page < 0) {
        return;
      }
      if (page != this.activePage) {
        this.$emit("to-page", page);
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/scss/main.scss";

/* TODO - refac this style, too much repeated code */
// .radius-theme {
//   border-radius: $main-border-radius;
// }

.wrap-pages{
  min-width: 150px;
}

.prev-next {
  border: #275389;
}

.number-control {
  background: #F8F8F8;
  width: 40px;
  height: 40px;
  border: 1px #D8D8D8 solid;
  border-radius: 4px;
}

.pagination {
  background: #F8F8F8;
}

a {
  color: #D8D8D8;
  text-decoration: none;
}

li:link {
  cursor: pointer;
  background-color: #9B9B9B;
}

li:visited {
  cursor: pointer;
  background-color: #F8F8F8;
  color: #D8D8D8;
}

li:hover,
li.active {
  cursor: pointer;
  background-color: #9B9B9B;
  color: white;
}

li.disabled {
  &:hover {
    cursor: default;
    background-color: white;
    color: #9B9B9B;
  }
}

li:active {
  cursor: pointer;
  background-color: #9B9B9B;
  color: white;
}
</style>