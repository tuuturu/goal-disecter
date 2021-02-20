<template>
  <div class="Goal">
    <h1>{{ goal.title }}</h1>
    <p>{{ goal.reasoning }}</p>

    <GoalList :goals="subgoals" />

    <div class="goal-actions" v-show="!showSubgoalAdder">
      <button class="secondary" @click="showSubgoalAdder = true">
        <span v-if="subgoals.length === 0">Dissect</span>
        <span v-else>Add subgoal</span>
      </button>
    </div>
    <div class="" v-show="showSubgoalAdder">
      <input placeholder="Add something" />
    </div>
  </div>
</template>

<script>
import GoalList from '~/components/GoalList.vue'

export default {
  name: 'Goal',
  components: { GoalList },
  computed: {
    goal() {
      return this.$store.getters['goals/goal'](this.$route.params.id)
    },
    subgoals() {
      return this.$store.getters['goals/subgoals'](this.$route.params.id)
    }
  },
  data: () => ({
    showSubgoalAdder: false
  }),
  async created() {
    await this.$store.dispatch('goals/refresh')
  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/theme';

.Goal {
  padding: 0 1em;
}

.GoalList {
  width: 100%;
}

button.secondary {
  padding: 1em;

  background: $primary-background-color;
  border: 0;
}

button.secondary:hover {
  outline: $primary-color solid $default-border-size;

  -moz-outline-radius: $default-radius;
}
</style>
