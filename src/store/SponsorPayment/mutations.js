export function setList (state, data) {
  state.list = data
}

export function pushList (state, data) {
  state.list.push(data)
}

export function setPost (state, data) {
  state.post = data
}

export function setPut (state, data) {
  state.put = data
}

export function modifyList (state, data) {
  var foundIndex = state.list.findIndex(value => value.id === data.id)
  state.list[foundIndex] = data
  state.list.push()
}

export function setDelete (state, data) {
  state.delete = data
}

export function deleteList (state, data) {
  const index = state.list.findIndex(value => value.id === data.id)
  state.list.splice(index, 1)
}

export function setData (state, data) {
  state.data = data
}

export function setBalance (state, data) {
  state.balance = data
}