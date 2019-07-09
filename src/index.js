Component({
  properties: {
    year: {
      type: Number
    },
    month: {
      type: Number
    }
  },
  observers: {
    'year,month': function (year, month) {
      const now = new Date()
      const arr = []
      const daysInMonth = new Date(year, month, 0).getDate()
      const beginDayInMonth = new Date(year, month - 1, 1).getDay()
      // s===-1，非当前月, s===0, 非当日，s===1 当日
      for (let i = 0; i < 7 * 6; ++i) {
        if (i < beginDayInMonth || i >= beginDayInMonth + daysInMonth) {
          arr.push({s: -1, d: 0})
        } else {
          const isToday = (i - beginDayInMonth + 1) === now.getDate() &&
          month === now.getMonth() + 1 &&
          year === now.getFullYear()
          arr.push({s: isToday ? 1 : 0, d: i - beginDayInMonth + 1})
        }
      }

      this.setData({
        vals: arr
      })
    }
  },
  data: {
    vals: [],
    weeks: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  },
  methods: {
    onDayTap(e) {
      const {year, month, day} = e.currentTarget.dataset
      this.triggerEvent('dateTap', {year, month, day}, {})
    },
    onPrev() {
      let {year, month} = this.data
      if (month === 1) {
        year -= 1
        month = 12
      } else {
        month -= 1
      }
      this.setData({
        year,
        month
      })
    },
    onNext() {
      let {year, month} = this.data
      if (month === 12) {
        year += 1
        month = 1
      } else {
        month += 1
      }
      this.setData({
        year,
        month
      })
    }
  },
  ready() {
    let {year, month} = this.data
    if (!(year && month)) {
      const now = new Date()
      year = now.getFullYear()
      month = now.getMonth() + 1
      this.setData({year, month})
    }
  }
})
