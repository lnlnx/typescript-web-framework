export class UserForm {
  constructor(public parent: Element) {}

  template(): string {
    return `
      <div>
        <h1> User Input </h1>
        <input></input>
      </div>
    `;
  }

  render() {
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    this.parent.append(templateElement.content);
  }
}
