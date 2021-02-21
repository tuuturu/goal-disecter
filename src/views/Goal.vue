<template>
  <div class="Goal">
    <h1>{{ goal.title }}</h1>
    <p>{{ goal.reasoning }}</p>

    <GoalList :goals="subgoals" />

    <div class="goal-actions" v-show="!showSubgoalAdder">
      <button v-if="subgoals.length === 0" class="primary" @click="showSubgoalAdder = true">Dissect</button>
      <button v-else class="secondary" @click="showSubgoalAdder = true">Add subgoal</button>
    </div>
    <div class="goal-dissecter" v-show="showSubgoalAdder">
      <h2>Dissect this goal into three subgoals</h2>

      <p>To fulfill this goal..</p>
      <label v-for="i of range(0, 3)">
        <span>I need to </span>
        <input
            placeholder=""
            @keypress.enter="addSubgoal"
            @focusout="addSubgoal" />
      </label>
    </div>
  </div>
</template>

<script>
import GoalList from '~/components/GoalList.vue'

import models from '~/models'

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
  },
  methods: {
    range: function*(start, end) {
      for (let i = start; i < end; i++) yield i
    },
    async addSubgoal(event) {
      const goal = new models.Goal({
        parent: this.goal.id,
        title: event.target.value,
        reasoning: 'n/a',
      })

      if (!goal.validate()) {
        return
      }

      await this.$store.dispatch('goals/add', goal)

      event.target.remove()

      if (this.subgoals.length === 3) this.showSubgoalAdder = false
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'src/assets/theme';

.Goal {
  padding: 0 $default-padding;

  display: flex;
  flex-direction: column;

  align-items: center;
}

.GoalList {
  width: 100%;
}

button {
  padding: 1em 2em;

  border-width: $default-border-size;
  border-radius: $default-radius;
}

.goal-dissecter {
  display: flex;
  flex-direction: column;

  width: 25%;
}
</style>
