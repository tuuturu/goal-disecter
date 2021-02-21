<template>
  <div class="Goal">
    <div class="header">
      <div class="header-left">&nbsp;</div>
      <div class="header-center">
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
      </div>
      <div class="header-right">
        <IconCheck @click="markAsDone"/>
        <span>mark complete</span>
      </div>
    </div>

    <GoalList :goals="incompleteSubgoals" />

    <div class="goal-actions" v-show="!showSubgoalAdder">
      <button v-if="incompleteSubgoals.length === 0" class="primary" @click="showSubgoalAdder = true">Dissect</button>
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

    <div class="completed-goal-container" v-show="completedSubgoals.length > 0">
      <h2>Completed goals</h2>
      <GoalList :goals="completedSubgoals" />
    </div>
  </div>
</template>

<script>
import GoalList from '~/components/GoalList.vue'

import models from '~/models'
import IconCheck from '~/components/IconCheck.vue'

export default {
  name: 'Goal',
  components: { GoalList, IconCheck },
  computed: {
    goal() {
      return this.$store.getters['goals/goal'](this.$route.params.id)
    },
    incompleteSubgoals() {
      return this.$store.getters['goals/subgoals'](this.$route.params.id).filter(subgoal => !subgoal.complete)
    },
    completedSubgoals() {
      return this.$store.getters['goals/subgoals'](this.$route.params.id).filter(subgoal => subgoal.complete)
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
    async markAsDone() {
      const parent = this.goal.parent

      await this.$store.dispatch('goals/markComplete', this.goal.id)

      if (parent) return this.$router.push(`/goals/${parent}`)

      return this.$router.push('/')
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

      if (this.incompleteSubgoals.length === 3) this.showSubgoalAdder = false
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'src/assets/theme';

.Goal {
  margin: 1em;
  padding: 0 $default-spacing;

  display: flex;
  flex-direction: column;

  align-items: center;
}

.header {
  width: 100%;

  display: flex;
  justify-content: space-between;

  align-items: center;
}

.header-left,
.header-right {
  flex-basis: 30%;
}

.header-center {
  max-width: 50%;
}

.header-right {
  display: flex;
  flex-direction: column;

  align-items: center;

  svg {
    width: 52px;
    height: 52px;

    color: $primary-color;
  }
  svg:hover {
    color: $primary-text-color;
  }
}

h1 {
  margin: 0;
}

.GoalList {
  width: 100%;
}

.completed-goal-container {
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
  padding: $default-spacing;

  background: white;
  border: $default-border-size solid $primary-color;
  border-radius: $default-radius;
}
</style>
