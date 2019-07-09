function compareVersion(v1, v2) {
  v1 = v1.split('.')
  v2 = v2.split('.')
  const len = Math.max(v1.length, v2.length)
  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }
  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i], 10)
    const num2 = parseInt(v2[i], 10)

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }
  return 0
}

const version = wx.getSystemInfoSync().SDKVersion

Component({
  properties: {
    year: {
      type: Number,
      observer() {
        if (compareVersion(version, '2.6.1') < 0) {
          this.update(this.data)
        }
      }
    },
    month: {
      type: Number,
      observer() {
        if (compareVersion(version, '2.6.1') < 0) {
          this.update(this.data)
        }
      }
    }
  },
  observers: {
    'year,month': function (year, month) {
      this.update({year, month})
    }
  },
  data: {
    vals: [],
    weeks: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  },
  methods: {
    update({year, month}) {
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
    },
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
