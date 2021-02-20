<template>
  <div class="GoalListItem" @click="$router.push(`/goals/${goal.id}`)">
    <h2>{{ goal.title }}</h2>
  </div>
</template>

<script>
export default {
  name: 'GoalListItem',
  props: {
    goal: {
      type: Object,
      required: true,
    }
  },
}
</script>

<style lang="scss" scoped>
.GoalListItem {
  border: 1px solid black;

  cursor: pointer;
}
</style>
