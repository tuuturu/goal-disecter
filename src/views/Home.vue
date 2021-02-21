<template>
  <div class="Home">
    <div class="input-container">
      <span>I want to</span>
      <input aria-label="new goal input" placeholder="add a goal" @keypress.enter="addGoal"/>
    </div>

    <GoalList :goals="goals" />

    <div class="completed-goals" v-show="completedGoals.length > 0">
      <h2>Complete</h2>

      <GoalList :goals="completedGoals" />
    </div>
  </div>
</template>

<script>
import GoalList from '~/components/GoalList.vue'

import models from '~/models'

export default {
  name: 'Home',
  components: { GoalList },
  computed: {
    goals() {
      return this.$store.getters['goals/topLevelGoals'].filter(goal => !goal.complete)
    },
    completedGoals() {
      return this.$store.getters['goals/topLevelGoals'].filter(goal => goal.complete)
    },
  },
  created() {
    this.$store.dispatch('goals/refresh')
  },
  methods: {
    async addGoal(event) {
      const goal = new models.Goal({
        parent: null,
        title: event.target.value,
        reasoning: 'n/a',
      })

      if (!goal.validate()) {
        console.warn('goal did not validate')
        return
      }

      await this.$store.dispatch('goals/add', goal)

      event.target.value = ''
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'src/assets/theme';

.Home {
  padding: $default-spacing;

  display: flex;
  flex-direction: column;

  align-items: center;
}

.input-container {
  width: 30%;

  display: flex;
  align-items: center;

  span {
    width: 124px;

    font-weight: bold;
  }
}

input {
  display: inline;

  width: 100%;
  padding: 1em;
}

.GoalList {
  width: 100%;
}

.completed-goals {
  width: 100%;
}
</style>
