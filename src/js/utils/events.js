"use strict"

export const on = function (el, type, callback) {
  if(el.addEventListener) {
    el.addEventListener(type, callback)
  } else {
    el.attachEvent('on' + type, function() {
      callback.call(el)
    })
  }
}

export const off = function (el, type, callback) {
  if(el.removeEventListener) {
    el.removeEventListener(type, callback)
  } else {
    el.detachEvent('on' + type, callback)
  }
}

export const once = function (el, type, callback) {
  let typeArray = type.split(' ')
  let recursiveFunction = function(e){
    e.target.removeEventListener(e.type, recursiveFunction)
    return callback(e)
  }

  for (let i = typeArray.length - 1; i >= 0; i--) {
    on(el, typeArray[i], recursiveFunction)
  }
}
