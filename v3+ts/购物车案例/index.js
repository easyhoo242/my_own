const { createApp, reactive, computed } = Vue

const vm = createApp({
  // template: '#my-app',.
  setup() {
    let uid = 0
    const createBooks = () => {
      ++uid
      return {
        id: uid,
        name: '本草纲目',
        price: '335',
        date: '19990527',
        count: 1
      }
    }
    const bookList = new Array(15).fill(null).map(res => createBooks())

    const getBetterBooks = (bookList) => {
      return bookList.map(item => ({
        ...item,
        idC: item.id,
        nameC: item.name,
        priceC: item.price,
        dateC: item.date,
        countC: item.count
      }))
    }
    // 要想操作 就必须为响应式的数据
    const books = reactive(getBetterBooks(bookList))

    const decrement = (index) => {
      books[index].countC--
    }
    const increment = (index) => {
      books[index].countC++
    }

    const remove = (index) => {
      books.splice(index, 1)
    }

    const totalPrice = computed(() => {
      let finalPrice = 0
      for (let book of books) {
        finalPrice += book.priceC * book.countC
      }
      return finalPrice
    })

    return {
      books,
      totalPrice,
      decrement,
      increment,
      remove
    }
  }
})
vm.mount('#app') 