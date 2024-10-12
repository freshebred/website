function openMenu() {
  const nav = document.querySelector('nav');
  nav.classList.toggle('open');
}

function open() {
swal("Get in touch","You can mail me at namhphuc2009@gmail.com or add my discord freshebred!","info");

}
var prev;
var now;
const borderRadii = [
'75% 25% 43% 57% / 23% 80% 20% 77%',
'70% 30% 55% 45% / 29% 82% 18% 71%',
'44% 56% 25% 75% / 68% 72% 28% 32%',
'63% 37% 75% 25% / 33% 94% 6% 67%',
'18% 82% 42% 58% / 22% 36% 64% 78%',
'75% 25% 43% 57% / 23% 80% 20% 77%'
];
function changeBorderRadius() {
const randomIndex = Math.floor(Math.random() * borderRadii.length);
now = randomIndex;
if (now == prev) {changeBorderRadius()} 
else{
  prev = now;
  document.getElementById('moveThis').style.borderRadius = borderRadii[randomIndex];
  //document.getElementById('moveThis2').style.borderRadius = borderRadii[randomIndex];
}
}
function changeBorderRadius2() {
const randomIndex2 = Math.floor(Math.random() * borderRadii.length);
now = randomIndex2;
if (now == prev) {changeBorderRadius2()} 
else{
  prev = now;
  document.getElementById('moveThis2').style.borderRadius = borderRadii[randomIndex2];
}
}
setInterval(changeBorderRadius, 1000);
changeBorderRadius();
setInterval(changeBorderRadius2, 750);
changeBorderRadius2();
