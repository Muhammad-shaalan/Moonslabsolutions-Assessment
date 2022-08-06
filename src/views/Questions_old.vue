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
    // if (localStorage.getItem("questions") == null) {
    //   this.getQuestions();
    // } else {
    //   this.questions = JSON.parse(localStorage.getItem("questions"));
    // }
    this.$store.dispatch("getAllQuestions");
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
    // getQuestions: function () {
    //   axios
    //     .get(
    //       "https://opentdb.com/api.php?amount=4&category=18&difficulty=medium&type=multiple"
    //     )
    //     .then((response) => {
    //       if (response.data.error) {
    //         //
    //       } else {
    //         this.mapQuestions(response.data.results);
    //         this.questions = response.data.results;
    //         localStorage.setItem(
    //           "questions",
    //           JSON.stringify(response.data.results)
    //         );
    //       }
    //     });
    // },
    // mapQuestions: function (questions) {
    //   return questions.map((question) => {
    //     question.chosen_answer = "";
    //     question.all_answers = question.incorrect_answers;
    //     question.all_answers.push(question.correct_answer);
    //     console.log("All_Answers", question.all_answers);
    //     question.all_answers.sort(() => 0.5 - Math.random());
    //     console.log("All_Answers_After_Sort", question.all_answers);
    //   });
    // },
    selectAnswer: function (answer) {
      this.$store.dispatch("selectAnswer", {
        answer,
        question_id: this.$route.params.id - 1,
      });
      // this.questions[this.$route.params.id - 1].chosen_answer = answer;
      // localStorage.setItem("questions", JSON.stringify(this.questions));
    },
  },
};
</script>
