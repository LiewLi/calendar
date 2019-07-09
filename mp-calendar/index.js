module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function compareVersion(v1, v2) {
  v1 = v1.split('.');
  v2 = v2.split('.');
  var len = Math.max(v1.length, v2.length);
  while (v1.length < len) {
    v1.push('0');
  }
  while (v2.length < len) {
    v2.push('0');
  }
  for (var i = 0; i < len; i++) {
    var num1 = parseInt(v1[i], 10);
    var num2 = parseInt(v2[i], 10);

    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1;
    }
  }
  return 0;
}

var version = wx.getSystemInfoSync().SDKVersion;

Component({
  properties: {
    year: {
      type: Number,
      observer: function observer() {
        if (compareVersion(version, '2.6.1') < 0) {
          this.update(this.data);
        }
      }
    },
    month: {
      type: Number,
      observer: function observer() {
        if (compareVersion(version, '2.6.1') < 0) {
          this.update(this.data);
        }
      }
    }
  },
  observers: {
    'year,month': function yearMonth(year, month) {
      this.update({ year: year, month: month });
    }
  },
  data: {
    vals: [],
    weeks: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  },
  methods: {
    update: function update(_ref) {
      var year = _ref.year,
          month = _ref.month;

      var now = new Date();
      var arr = [];
      var daysInMonth = new Date(year, month, 0).getDate();
      var beginDayInMonth = new Date(year, month - 1, 1).getDay();
      // s===-1，非当前月, s===0, 非当日，s===1 当日
      for (var i = 0; i < 7 * 6; ++i) {
        if (i < beginDayInMonth || i >= beginDayInMonth + daysInMonth) {
          arr.push({ s: -1, d: 0 });
        } else {
          var isToday = i - beginDayInMonth + 1 === now.getDate() && month === now.getMonth() + 1 && year === now.getFullYear();
          arr.push({ s: isToday ? 1 : 0, d: i - beginDayInMonth + 1 });
        }
      }

      this.setData({
        vals: arr
      });
    },
    onDayTap: function onDayTap(e) {
      var _e$currentTarget$data = e.currentTarget.dataset,
          year = _e$currentTarget$data.year,
          month = _e$currentTarget$data.month,
          day = _e$currentTarget$data.day;

      this.triggerEvent('dateTap', { year: year, month: month, day: day }, {});
    },
    onPrev: function onPrev() {
      var _data = this.data,
          year = _data.year,
          month = _data.month;

      if (month === 1) {
        year -= 1;
        month = 12;
      } else {
        month -= 1;
      }
      this.setData({
        year: year,
        month: month
      });
    },
    onNext: function onNext() {
      var _data2 = this.data,
          year = _data2.year,
          month = _data2.month;

      if (month === 12) {
        year += 1;
        month = 1;
      } else {
        month += 1;
      }
      this.setData({
        year: year,
        month: month
      });
    }
  },
  ready: function ready() {
    var _data3 = this.data,
        year = _data3.year,
        month = _data3.month;

    if (!(year && month)) {
      var now = new Date();
      year = now.getFullYear();
      month = now.getMonth() + 1;
      this.setData({ year: year, month: month });
    }
  }
});

/***/ })
/******/ ]);