import { createStore } from 'vuex'

import goals from './goals'

const store = createStore({
  modules: {
    goals,
  }
})

export default store
