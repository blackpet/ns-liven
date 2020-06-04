import {writable} from 'svelte/store'

// action data storage
export let action = writable({})

function livenSocket() {
  let socket

  const set = s => {socket = s}
  const get = () => socket

  return {set, get}
}

// node socket
export const LivenSocket = new livenSocket()
