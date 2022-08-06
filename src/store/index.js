/* eslint-disable prettier/prettier */
import { createStore } from "vuex";
import axios from "axios";
export default createStore({
    state: {
        questions: [],
        total_points: 0,
        solvedQuestions: 0,
    },
    getters: {
        getAllQuestions(state) {
            return state.questions ? state.questions : 0;
        },
        getAllQuestionsNumbers(state) {
            return state.questions ? state.questions.length : 0;
        },
        getTotalPoints(state) {
            return state.total_points;
        },
        getSolvedQuestions(state) {
            return state.solvedQuestions;
        },
    },
    mutations: {
        GET_ALL_QUESTIONS(state, questions) {
            // Reset State
            state.total_points = 0
            state.solvedQuestions = 0
            var mappedQuestions = questions.map((question) => {
                question.chosen_answer = "";
                question.all_answers = question.incorrect_answers;
                question.all_answers.push(question.correct_answer);
                delete question.incorrect_answers;
                // Sort Array Randomly
                question.all_answers.sort(() => 0.5 - Math.random());
                return question;
            });
            state.questions = mappedQuestions;
        },
        SELECT_ANSWER(state, data) {
            state.questions[data.question_id].chosen_answer = data.answer;
        },
        GET_TOTAL_POINTS(state) {
            let totalPoints = 0;
            for (let result of state.questions) {
                if (result.correct_answer == result.chosen_answer) {
                    totalPoints++;
                }
            }
            state.total_points = totalPoints;
        },
        CHECK_SOLVED_QS_NUM(state) {
            let solvedQuestions = 0;
            for (let question of state.questions) {
                if (question.chosen_answer) {
                    solvedQuestions++;
                }
            }
            state.solvedQuestions = solvedQuestions;
        },
    },
    actions: {
        getAllQuestions({ commit }) {
            return new Promise(() => {
                axios.post("https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple")
                    .then((response) => {
                        if(response.status == 200) {
                            commit("GET_ALL_QUESTIONS", response.data.results);
                        }
                    });
            });
        },
        selectAnswer({ commit }, { answer, question_id }) {
            commit("SELECT_ANSWER", { answer, question_id });
            commit("CHECK_SOLVED_QS_NUM");
        },
    },
    modules: {},
  });
  