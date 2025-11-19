import { defineStore, acceptHMRUpdate } from 'pinia'

export const useCartStore = defineStore('shopping-cart', {
  state: () => ({
    items: [] as Array<{
      id: number
      name: string
      price: number
      qty: number
      image_url: string
    }>,
  }),

  getters: {
    count: (state) => state.items.reduce((total, item) => total + item.qty, 0),

    totalPrice: (state) => state.items.reduce((total, item) => total + item.qty * item.price, 0),
  },

  actions: {
    addItem(newItem: { id: number; name: string; price: number; image_url: string }) {
      const existing = this.items.find((item) => item.id === newItem.id)

      if (existing) {
        existing.qty++
      } else {
        this.items.push({ ...newItem, qty: 1 })
      }
    },

    removeItem(id: number) {
      this.items = this.items.filter((item) => item.id !== id)
    },

    decreaseQty(id: number) {
      const item = this.items.find((p) => p.id === id)
      if (!item) return

      if (item.qty > 1) item.qty--
      else this.removeItem(id)
    },

    clear() {
      this.items = []
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
