<template>
  <ul class="GoalList">
    <li v-for="goal in goals" :key="goal.title">
      <GoalListItem :goal="goal" />
    </li>
  </ul>
</template>

<script>
import GoalListItem from './GoalListItem.vue'

export default {
  name: 'GoalList',
  components: { GoalListItem },
  props: {
    goals: {
      type: Array,
      required: true,
    }
  }
}
</script>

<style lang="scss" scoped>
.GoalList {
  padding: 0;
}

li {
  list-style: none;
}

.GoalListItem {
  margin-bottom: 1em;
}
</style>
