<template>
  <div class="Home">
    <div class="input-container">
      <span>I want to</span>
      <input aria-label="new goal input" placeholder="add a goal" @keypress.enter="addGoal"/>
    </div>

    <GoalList :goals="goals" />
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
      return this.$store.getters['goals/topLevelGoals']
    }
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
.Home {
  margin-top: 1em;

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
  width: 50%;
}
</style>
