<template>
  <div class="Goal">
    <h1
        id="title"
        :class="{ 'pre-editable': !editable.title, editable: editable.title }"
        @click="edit"
        @focusout="save"
        @keypress.enter="blur"
    >
      {{ goal.title }}
    </h1>
    <p
        id="reasoning"
        :class="{ 'pre-editable': !editable.reasoning, editable: editable.reasoning }"
        @click="edit"
        @focusout="save"
        @keypress.enter="blur"
    >
      {{ goal.reasoning }}
    </p>

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
    showSubgoalAdder: false,
    editable: {
      title: false,
      reasoning: false,
    }
  }),
  async created() {
    await this.$store.dispatch('goals/refresh')
  },
  methods: {
    range: function*(start, end) {
      for (let i = start; i < end; i++) yield i
    },
    blur() {
      document.activeElement.blur()
    },
    edit(event) {
      if (event.target.id === 'title') this.editable.title = true
      else if (event.target.id === 'reasoning') this.editable.reasoning = true

      event.target.contentEditable = true

      event.target.focus()
    },
    save(event) {
      if (event.target.id === 'title') {
        this.editable.title = false

        this.goal.title = event.target.innerText
      }
      else if (event.target.id === 'reasoning') {
        this.editable.reasoning = false

        this.goal.reasoning = event.target.innerText
      }

      event.target.contentEditable = false

      this.$store.dispatch('goals/update', this.goal)
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

      event.target.parentElement.remove()

      if (this.subgoals.length === 3) this.showSubgoalAdder = false
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'src/assets/theme';

.Goal {
  margin: 1em;
  padding: 0 $default-padding;

  display: flex;
  flex-direction: column;

  align-items: center;
}

h1 {
  margin: 0;
}

.GoalList {
  width: 100%;
}

.goal-dissecter {
  display: flex;
  flex-direction: column;

  width: 25%;
}

.pre-editable {
  cursor: pointer;
}

.editable {
  padding: $default-padding;

  background: white;
  border: $default-border-size solid $primary-color;
  border-radius: $default-radius;
}
</style>
