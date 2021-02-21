import { v4 as uuidv4 } from 'uuid' // TODO: Remove dep when backend is online

import models from '~/models'

const state = () => ({
  goals: [],
})

const mutations = {
  goals(state, newGoals) {
    state.goals = newGoals
  },
  goal(state, newGoal) {
    const index = findGoalIndexByID(state.goals, newGoal.id)

    if (index !== -1) state.goals.splice(index, 1)

    state.goals.push(newGoal)
  },
}

const getters = {
  goal: state => id => {
    const index = findGoalIndexByID(state.goals, id)

    return state.goals[index]
  },
  subgoals: state => id => {
    return state.goals.filter(goal => goal.parent === id)
  },
  topLevelGoals: state => {
    return state.goals.filter(goal => !goal.parent)
  }
}

const actions = {
  async refresh({ commit, state }) {
    if (state.goals.length > 0) return

    const goals = createMockGoals().map(rawGoal => new models.Goal(rawGoal))
    
    commit('goals', goals)
  },
  async add({ commit }, goal) {
    goal.id = uuidv4()

    commit('goal', goal)
  },
  async update({ commit }, updatedGoal) {
    console.log('updating: ', updatedGoal)
    
    commit('goal', updatedGoal)
  },
  async markComplete({ commit, dispatch, getters }, goalID) {
    getters.subgoals(goalID).forEach(subgoal => subgoal.complete = true)
    
    const goal = getters.goal(goalID)

    goal.complete = true
    
    await dispatch('update', goal)
  }
}

export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
}

/*
 * Helpers
 */
function findGoalIndexByID(goals, id) {
  return goals.findIndex(goal => goal.id === id)
}

function createMockGoals() {
  return [
    {
      parent: null,
      id: "ecca9e55-c0f4-42c4-b287-4388b25a2066",
      title: "Kjøpe hus/leilighet",
      reasoning: "Har lyst på et sted jeg kan fikle med ting, blandt annet gitar",
    },
    {
      parent: "ecca9e55-c0f4-42c4-b287-4388b25a2066",
      id: "3367984c-b52b-44bd-b587-b527e70b53de",
      title: "Øke lønn",
      reasoning: "Enklere å få lån samt raskere å opparbeide egenandel",
    },
    {
      parent: "ecca9e55-c0f4-42c4-b287-4388b25a2066",
      id: "3367984c-b52b-44bd-b587-b527e70b53de",
      title: "Selge bobil",
      reasoning: "Dette vil redusere lån og utgifter i dag, samt øke evnen til å opparbeide egenandel",
    },
  ]
}
