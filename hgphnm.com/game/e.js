//initiallize draggable elements
function initial() {
  const draggableElements = document.querySelectorAll(".draggable");
  draggableElements.forEach((draggable) => {
    //note: variable "draggable" là cái element thứ n trong array tất cả những element có class ".draggable"
    //setting event listener for each draggable element
    draggable.addEventListener("mousedown", function (e) {
      initMousedown(e, draggable);
    });

    draggable.addEventListener("mouseup", function () {
      initMouseUp();
    });

    draggable.addEventListener("mousemove", function (e) {
      initMousemove(e, draggable);
    });
  });
}
//function for mousedown event
function initMousedown(e, draggable) {
  isDragging = true;
  initialX = e.clientX - draggable.getBoundingClientRect().left;
  initialY = e.clientY - draggable.getBoundingClientRect().top;
}
//function for mouseup event

function initMouseUp() {
  isDragging = false;
}
//function for mousemove event
function initMousemove(e, draggable) {
  if (isDragging) {
    if (!isTouchingAny(draggable)) {
      draggable.style.left = `${e.clientX - initialX}px`;
      draggable.style.top = `${e.clientY - initialY}px`;
    } else {
      draggable.style.display = "none";
      console.log("elementt is touching an obstacle");
    }
  }
}
//function to make an element un-draggable
function unclassify(element, className) {
  if (element.classList) {
    element.classList.remove(className);
    element.removeEventListener("mousedown", initMousedown);
    element.removeEventListener("mouseup", initMouseUp);
    element.removeEventListener("mousemove", initMousemove);
    initial();
  }
}
function start() {
  var id = newE
}