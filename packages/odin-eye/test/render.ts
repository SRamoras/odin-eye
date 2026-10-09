export function render(body: string, head = "") {
  document.head.innerHTML = head;
  document.body.innerHTML = body;
}
