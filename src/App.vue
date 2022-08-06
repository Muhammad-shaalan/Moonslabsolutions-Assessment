<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Logo</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/questions/1" class="nav-link"
              >Questions</router-link
            >
          </li>
          <li class="nav-item d-flex align-items-center">
            <router-link
              :to="'/questions/' + (this.$route.params.id - 1)"
              :class="isDisabled('prev') ? 'nav-link disabled' : 'nav-link'"
              >Previous</router-link
            >
            <span class="text-white"
              >{{ solvedQuestions }} / {{ questionsNumber }}</span
            >
            <router-link
              :to="'/questions/' + (+this.$route.params.id + +1)"
              :class="isDisabled('next') ? 'nav-link disabled' : 'nav-link'"
              >Next</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              to="/results"
              :class="
                !questionsNumber || solvedQuestions < questionsNumber
                  ? 'nav-link disabled'
                  : 'nav-link'
              "
              >Results</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<script>
export default {
  name: "QuestionsView",
  data() {
    return {
      // questionsNumber: 0,
    };
  },
  computed: {
    questionsNumber() {
      return this.$store.getters.getAllQuestionsNumbers;
    },
    solvedQuestions() {
      return this.$store.getters.getSolvedQuestions;
    },
    isDisabled() {
      return (val) => {
        if (!this.$route.params.id) {
          return true;
        }
        if (
          val == "next" &&
          this.$route.params.id >= this.$store.getters.getAllQuestionsNumbers
        ) {
          return true;
        } else if (val == "prev" && this.$route.params.id <= 1) {
          return true;
        } else {
          return false;
        }
      };
    },
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #eee;
}

nav a.router-link-exact-active {
  color: #fff;
}
</style>
