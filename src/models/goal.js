
export default class {
  constructor({ id, parent, title, reasoning, complete }) {
    this.id = id
    this.parent = parent

    this.title = title
    this.reasoning = reasoning

    this.complete = !!complete
  }
  
  validate() {
    if (this.title.length < 5) return false

    return true
  }
}
