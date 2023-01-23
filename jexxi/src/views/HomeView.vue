<template>
  <main>
    <div class="chatContainer"></div>
    <form @submit.prevent="fetchAnswer" >
      <textarea
        rows="1"
        cols="1"
        placeholder="Ask JexiChat..."
        v-model="question"
      ></textarea>
      <button type="submit"><img src="@/assets/send.svg" alt="send" /></button>
    </form>
  </main>
</template>

<script setup>
import { ref } from "vue";

const question = ref("");


const fetchAnswer = async () => {
  console.log(question.value);
}

</script>

