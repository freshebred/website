function newElement() {
  const div = document.createElement("div");
  const randomId = Math.random().toString(36).substr(2, 9); // Generate a random 9-character ID
  div.id = randomId;
  document.body.appendChild(div); // Append the div to the body
  initclassify(document.getElementById(randomId), "static");
  return randomId;
}
function delElement(id) {
  const element = document.getElementById(id);
  if (element) {
    element.remove();
  }
}
function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function isTouching(element1, element2) {
  if (element1 === element2) {
    return false; // Elements are the same
  }
  var rect1 = element1.getBoundingClientRect();
  var rect2 = element2.getBoundingClientRect();

  // Calculate boundaries
  var left1 = rect1.left;
  var right1 = rect1.left + rect1.width;
  var top1 = rect1.top;
  var bottom1 = rect1.top + rect1.height;

  var left2 = rect2.left;
  var right2 = rect2.left + rect2.width;
  var top2 = rect2.top;
  var bottom2 = rect2.top + rect2.height;
  // Check for overlap
  return !(
    right1 < left2 ||
    left1 > right2 ||
    bottom1 < top2 ||
    top1 > bottom2
  );
}

function isTouchingAny(element) {
  const obstacles = document.querySelectorAll(".obstacle");
  for (const obstacle of obstacles) {
    if (isTouching(element, obstacle)) {
      return true;
    }
  }

  return false;
}
//GOAL CLASS ELEMENT
function isTouchingGoal(element1, element2) {
  if (element1 === element2) {
    return false; // Elements are the same
  }
  var rect1 = element1.getBoundingClientRect();
  var rect2 = element2.getBoundingClientRect();

  // Calculate boundaries
  var left1 = rect1.left;
  var right1 = rect1.left + rect1.width;
  var top1 = rect1.top;
  var bottom1 = rect1.top + rect1.height;

  var left2 = rect2.left;
  var right2 = rect2.left + rect2.width;
  var top2 = rect2.top;
  var bottom2 = rect2.top + rect2.height;
  // Check for overlap
  return !(
    right1 < left2 ||
    left1 > right2 ||
    bottom1 < top2 ||
    top1 > bottom2
  );
}

function isTouchingAnyGoal(element) {
  const obstacles = document.querySelectorAll(".goal");
  for (const obstacle of obstacles) {
    if (isTouchingGoal(element, obstacle)) {
      return true;
    }
  }

  return false;
}
//GOAL CLASS ELEMENT
/*const element1 = document.getElementById('obj1');
const element2 = document.getElementById('obj2');

if (isTouching(element1, element2)) {
  console.log('The elements are touching!');
} else {
  console.log('The elements are not touching.');
}*/
let isDragging = false;
let initialX, initialY;
function initial() {
  const draggableElements = document.querySelectorAll(".draggable");
  draggableElements.forEach((draggable) => {
    // Define event listeners specific to each draggable
    function handleMouseDown(e) {
      initMousedown(e, draggable);
    }

    function handleMouseUp() {
      initMouseUp();
    }

    function handleMouseMove(e) {
      initMousemove(e, draggable);
    }

    // Add event listeners for each draggable element
    draggable.addEventListener("mousedown", handleMouseDown);
    draggable.addEventListener("mouseup", handleMouseUp);
    draggable.addEventListener("mousemove", handleMouseMove);

    // Store references to event listeners for removal later
    draggable._eventListeners = {
      handleMouseDown,
      handleMouseUp,
      handleMouseMove,
    };
    initclassify(draggable, "static");
  });
}

// Function to make an element un-draggable
function unclassify(element, className) {
  if (element.classList) {
    element.classList.remove(className);
    // Retrieve and remove stored event listeners
    const { handleMouseDown, handleMouseUp, handleMouseMove } =
      element._eventListeners || {};
    if (handleMouseDown)
      element.removeEventListener("mousedown", handleMouseDown);
    if (handleMouseUp) element.removeEventListener("mouseup", handleMouseUp);
    if (handleMouseMove)
      element.removeEventListener("mousemove", handleMouseMove);

    // Clear stored listeners
    delete element._eventListeners;
  }
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
/* function initMousemove(e, draggable) {
  if (isDragging) {
    if (isTouchingAnyGoal(draggable)) {
      draggable.style.display = "none"; 
      isDragging = false;
      console.log("is touching any goal:" + isTouchingAnyGoal(draggable));
    } 
    else if (!isTouchingAny(draggable)) {
        draggable.style.left = `${e.clientX - initialX}px`;
        draggable.style.top = `${e.clientY - initialY}px`;
      } 
    else {
        draggable.style.display = "none"; 
        isDragging = false;
         alert("you lost");
      }
  }
}
*/
function initMousemove(e, draggable) {
  if (isDragging) {
    if (isTouchingAnyGoal(draggable)) {
      // Code for touching goal (e.g., hide draggable, end game)
      draggable.style.display = "none";
      isDragging = false;
      console.log("is touching any goal:" + isTouchingAnyGoal(draggable));
    } else if (isTouchingAny(draggable)) {
      // Code for touching obstacle (e.g., alert "you lost")
      draggable.style.display = "none";
      isDragging = false;
      alert("You lost!");
    } else {
      // Code for normal movement
      draggable.style.left = `${e.clientX - initialX}px`;
      draggable.style.top = `${e.clientY - initialY}px`;
    }
  }
}

initial();
function style(div, w, h, t, l) {
  if (w) {
    div.style.width = w;
  }
  if (h) {
    div.style.height = h;
  }
  if (t) {
    div.style.top = t;
  }
  if (l) {
    div.style.left = l;
  }
}
function classify(element, className) {
  if (element.classList) {
    element.classList.add(className);
    initial();
  }
}
function initclassify(element, className) {
  if (element.classList) {
    element.classList.add(className);
  }
}
/*
let cont = true;
async function a() {
   while (cont){
    console.log(cont);
    await wait(1000)
  }
}*/
function basic() {
  const id = newElement();
  style(document.getElementById(id), "250px", "250px", "25%", "25%");
  classify(document.getElementById(id), "draggable");
}
var levelData;
fetch('level.json').then(response => response.json()).then(data => levelData = data)

function start(lv) {
  for (var i = 0; i < levelData[lv].property.length; i++) {
    var id = newElement();
    classify(document.getElementById(id), levelData[lv].property[i].type);
    style(
      document.getElementById(id),
      levelData[lv].property[i].w,
      levelData[lv].property[i].h,
      levelData[lv].property[i].t,
      levelData[lv].property[i].l
    );
  }
}
function reset() {
  const elementsToDelete = document.querySelectorAll('.obstacle, .draggable, .goal');
  elementsToDelete.forEach(element => element.remove());
}
/////////////////////////////////////////////////////////////////////////////////////////
function generateRandomLevelData(numLevels) {
  const levels = [];

  for (let i = 0; i < numLevels; i++) {
    const level = {
      property: []
    };

    // Generate draggable element
    const draggable = {
      type: "draggable",
      w: Math.floor(Math.random() * 10) + 5, // Random width between 5 and 14
      h: Math.floor(Math.random() * 10) + 5, // Random height between 5 and 14
      t: Math.floor(Math.random() * (100 - draggable.h)) + 1, // Random top position
      l: Math.floor(Math.random() * (100 - draggable.w)) + 1 // Random left position
    };
    level.property.push(draggable);

    // Generate goal element
    const goal = {
      type: "goal",
      w: Math.floor(Math.random() * 10) + 5, // Random width between 5 and 14
      h: Math.floor(Math.random() * 10) + 5, // Random height between 5 and 14
      t: Math.floor(Math.random() * (100 - goal.h)) + 1, // Random top position
      l: Math.floor(Math.random() * (100 - goal.w)) + 1 // Random left position
    };
    level.property.push(goal);

    // Generate obstacles (random number between 2 and 10)
    const numObstacles = Math.floor(Math.random() * 9) + 2;
    for (let j = 0; j < numObstacles; j++) {
      const obstacle = {
        type: "obstacle",
        w: Math.floor(Math.random() * 10) + 5, // Random width between 5 and 14
        h: Math.floor(Math.random() * 10) + 5, // Random height between 5 and 14
        t: Math.floor(Math.random() * (100 - obstacle.h)) + 1, // Random top position
        l: Math.floor(Math.random() * (100 - obstacle.w)) + 1 // Random left position
      };

      // Ensure obstacle doesn't overlap with draggable or goal
      while (
        isOverlapping(obstacle, draggable) ||
        isOverlapping(obstacle, goal) ||
        isOverlappingWithOtherObstacles(obstacle, level.property)
      ) {
        obstacle.t = Math.floor(Math.random() * (100 - obstacle.h)) + 1;
        obstacle.l = Math.floor(Math.random() * (100 - obstacle.w)) + 1;
      }

      level.property.push(obstacle);
    }

    levels.push(level);
  }

  return levels;
}

// Helper function to check if two elements overlap
function isOverlapping(element1, element2) {
  return (
    element1.t + element1.h >= element2.t &&
    element1.t <= element2.t + element2.h &&
    element1.l + element1.w >= element2.l &&
    element1.l <= element2.l + element2.w
  );
}

// Helper function to check if an element overlaps with any other obstacles in the level
function isOverlappingWithOtherObstacles(element, obstacles) {
  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].type === "obstacle" && obstacles[i] !== element && isOverlapping(element, obstacles[i])) {
      return true;
    }
  }
  return false;
}

// Generate 5 random levels
const levels = generateRandomLevelData(5);
console.log(levels);