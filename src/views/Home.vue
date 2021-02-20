<template>
  <div class="Home">
    <input aria-label="new goal input" placeholder="What do you want?" />

    <GoalList :goals="goals" />
  </div>
</template>

<script>
import GoalList from '~/components/GoalList.vue'

export default {
  name: 'Home',
  components: { GoalList },
  computed: {
    goals() {
      return this.$store.getters['goals/topLevelGoals']
    }
  },
  created() {
    this.$store.dispatch('goals/refresh')
  }
}
</script>

<style lang="scss" scoped>
.Home {
  margin-top: 1em;

  display: flex;
  flex-direction: column;

  align-items: center;
}

input {
  width: 25%;
  padding: 1em;
}

.GoalList {
  width: 50%;
}
</style>
