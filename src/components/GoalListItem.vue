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
@import 'src/assets/theme';

.GoalListItem {
  border: $default-border-size solid $primary-color;
  border-radius: $default-radius;

  background: $secondary-background-color;

  cursor: pointer;
}
</style>
