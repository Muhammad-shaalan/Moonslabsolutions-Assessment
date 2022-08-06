<template>
  <div class="container">
    <div class="card text-start" v-if="question">
      <div class="card-header">
        {{ this.$route.params.id }} -
        {{ question.question }}
      </div>
      <ul class="list-group list-group-flush">
        <li
          class="list-group-item"
          v-for="(answer, index) in question.all_answers"
          :key="index"
        >
          <div class="form-check">
            <input
              v-on:change="selectAnswer(answer)"
              class="form-check-input"
              type="radio"
              name="answers"
              v-model="checkedAnswer"
              :id="'answer-' + this.$route.params.id + index"
              :checked="answer == question.chosen_answer"
            />
            <label
              class="form-check-label"
              :for="'answer-' + this.$route.params.id + index"
            >
              {{ answer }}
            </label>
          </div>
        </li>
      </ul>
      <div class="card-footer text-muted">
        <router-link
          :to="'/questions/' + (this.$route.params.id - 1)"
          :class="
            this.$route.params.id <= 1
              ? 'btn btn-secondary me-2 disabled'
              : 'btn btn-secondary me-2'
          "
          >Previous</router-link
        >
        <router-link
          :to="'/questions/' + (+this.$route.params.id + +1)"
          :class="
            this.$route.params.id >= questionsNumber
              ? 'btn btn-dark disabled'
              : 'btn btn-dark'
          "
          >Next</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  name: "QuestionsView",
  data() {
    return {
      questions: [],
      checkedAnswer: "",
    };
  },
  created() {
    this.$store.dispatch("getAllQuestions");
    if (
      !this.$store.getters.getAllQuestionsNumbers ||
      this.$store.getters.getSolvedQuestions <
        this.$store.getters.getAllQuestionsNumbers
    ) {
      this.$router.push("/questions/1");
    }
  },
  computed: {
    questionsNumber() {
      return this.$store.getters.getAllQuestionsNumbers;
    },
    question() {
      return this.$store.getters.getAllQuestions[this.$route.params.id - 1];
    },
  },
  methods: {
    selectAnswer: function (answer) {
      this.$store.dispatch("selectAnswer", {
        answer,
        question_id: this.$route.params.id - 1,
      });
    },
  },
};
</script>
