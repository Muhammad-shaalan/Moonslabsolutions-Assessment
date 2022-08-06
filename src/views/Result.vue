<template>
  <div class="container">
    <div class="card text-start" v-if="results.length > 0">
      <div class="card-header bg-white">Result</div>
      <div class="table-responsive">
        <table class="table">
          <thead class="table-active">
            <tr>
              <th>The Question</th>
              <th>Correct Answer</th>
              <th>Your Answer</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(result, index) in results" :key="index">
              <td>{{ result.question }}</td>
              <td>{{ result.correct_answer }}</td>
              <td
                :class="
                  result.correct_answer == result.chosen_answer
                    ? 'text-success'
                    : 'text-danger'
                "
              >
                {{ result.chosen_answer }}
              </td>
              <td>
                <span
                  class="text-success"
                  v-if="result.correct_answer == result.chosen_answer"
                  >1</span
                >
                <span class="text-danger" v-else>0</span>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3"><b>Total Points</b></td>
              <td>
                <b>{{ totalPoints }}</b>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResultView",
  created() {
    if (
      !this.$store.getters.getAllQuestionsNumbers ||
      this.$store.getters.getSolvedQuestions <
        this.$store.getters.getAllQuestionsNumbers
    ) {
      this.$router.push("/questions/1");
    } else {
      this.$store.commit("GET_TOTAL_POINTS");
    }
  },
  computed: {
    results() {
      return this.$store.getters.getAllQuestions;
    },
    totalPoints() {
      return this.$store.getters.getTotalPoints;
    },
    questionsNumber() {
      return this.$store.getters.getAllQuestionsNumbers;
    },
    solvedQuestions() {
      return this.$store.getters.getSolvedQuestions;
    },
  },
};
</script>
<style scoped>
table th {
  white-space: nowrap;
}
</style>
