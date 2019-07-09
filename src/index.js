Component({
  properties: {
    year: {
      type: Number
    },
    month: {
      type: Number
    },
    day: {
      type: Number
    }
  },
  observers: {
    'year,month,day': function (year, month, day) {
      const arr = []
      const daysInMonth = new Date(year, month, 0).getDate()
      const beginDayInMonth = new Date(year, month - 1, 1).getDay()
      // s===-1，非当前月, s===0, 非当日，s===1 当日
      for (let i = 0; i < 7 * 6; ++i) {
        if (i < beginDayInMonth || i >= beginDayInMonth + daysInMonth) {
          arr.push({s: -1, d: 0})
        } else {
          arr.push({s: (i - beginDayInMonth + 1) === day ? 1 : 0, d: i - beginDayInMonth + 1})
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
    }
  },
  ready() {
    let {year, month, day} = this.data
    if (!(year && month && day)) {
      const now = new Date()
      year = now.getFullYear()
      month = now.getMonth() + 1
      day = now.getDate()
      this.setData({year, month, day})
    }
  }
})
