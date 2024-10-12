
function js() {
  const txta = document.getElementById("txta");
  const value = txta.value;
  const lastChar = value.charAt(value.length - 1);
  const submitButton = document.getElementById("submit");

  if (isNaN(lastChar) || value.length > 2) {
    txta.value = value.slice(0, -1);
  }

  if (document.getElementById("txta").value.length >=1) {
    submitButton.style.display = "block";
  } else {
    submitButton.style.display = "none";
  }
  if (document.getElementById("txta").value.length >= 1) {
    txta.classList.add("one-number");
    txta.classList.remove("two-numbers");
  } else {
    txta.classList.remove("one-number", "two-numbers");
  }
}
let data = "";
fetch('data.json')
  .then(response => response.json())
  .then(data1 => {
    data = data1
  })
  .catch(error => {
    console.error('Error loading JSON:', error);
  });
function go(){
    
    const txta = document.getElementById("txta");
    const value = txta.value;
    const button = document.getElementById("submit");
    button.innerHTML = "*️⃣";
    button.classList.add("spin");
    if(data[value]){
        alert("hey there " + data[value-1].name + "! your message is: " + data[value].desc);
    }
    else{
        txta.classList.remove("one-number", "two-numbers");
        txta.classList.add("error");
        alert("not found")
    }
}
const audio = new Audio('respite.mp3');
const pageHeight = document.documentElement.scrollHeight;
let isPlaying = false;

// Function to play audio after a short delay


// Event listener for scroll
window.addEventListener('scroll', () => {
  // Calculate scroll percentage
  const scrollPercentage = (window.scrollY / pageHeight) * 100;
  

  // Adjust volume based on scroll percentage
  audio.volume = scrollPercentage / 115;

  // Play audio if not playing and scroll percentage is greater than 0
  if (!isPlaying && scrollPercentage > 0) {
    playAudioAfterDelay();
  }
});
const tooltipTarget = document.getElementById('tooltip-target');
const tooltip = document.getElementById('tooltip');

tooltipTarget.addEventListener('mouseover', () => {
  tooltip.style.display = 'block';
  tooltip.style.top = (tooltipTarget.offsetTop + tooltipTarget.offsetHeight) + 'px';
  tooltip.style.left = (tooltipTarget.offsetLeft + tooltipTarget.offsetWidth) + 'px';
});

tooltipTarget.addEventListener('mouseout', () => {
  tooltip.style.display = 'none';
});
function away() {
  document.getElementById("cover").style.display = "none";
  audio.play();
  isPlaying = true;
}