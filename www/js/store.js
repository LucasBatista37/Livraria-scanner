const createStore = Framework7.createStore

// localStorageに履歴があれば復元
let history = localStorage.getItem('history')
history = !!history ? JSON.parse(history) : []

const store = createStore({
  state: {
    // スキャンデータが入る
    scan: {},
    // 履歴が入る
    history
  },
  getters: {
    // スキャンデータ用
    scan ({ state }) {
      return state.scan
    },
    // 履歴用
    history ({ state }) {
      return state.history
    }
  },
  actions: {
    // 新しいスキャンデータを追加するアクション
    addScan ({ state }, scan) {
      // スキャンデータの適用
      state.scan = scan
      // 履歴データに追加
      state.history = [...state.history, scan]
      // 履歴データをlocalStorageに書き出し
      localStorage.setItem('history', JSON.stringify(state.history))
    }
  }
})
