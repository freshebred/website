const checkboxContainer = document.getElementById("checkbox-container");

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    /*data.forEach(item => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = item.stat !== undefined && item.stat.split('/')[0] === item.stat.split('/')[1];
            checkbox.disabled = true; // Lock checkboxes

            const label = document.createElement('label');
            label.textContent = `${item.desc} ${item.stat ? `(${item.stat})` : ''}`;

            const checkboxItem = document.createElement('div');
            checkboxItem.classList.add('checkbox-item');
            checkboxItem.appendChild(checkbox);
            checkboxItem.appendChild(label);

            checkboxContainer.appendChild(checkboxItem);

            // Add background color based on checkbox state
            
                if (checkbox.checked) {
                    checkboxItem.style.backgroundColor = 'green';
                } else {
                    checkboxItem.style.backgroundColor = 'red';
                }
            
        });*/
    //
    /*data.forEach(item => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
          
            // Check state first, override stat rule
            if (item.state !== undefined) {
              checkbox.checked = item.state;
            } else {
              // Fallback to stat check if state is undefined
              checkbox.checked = item.stat !== undefined && item.stat.split('/')[0] === item.stat.split('/')[1];
            }
          
            checkbox.disabled = true; // Lock checkboxes
          
            const label = document.createElement('label');
            label.textContent = `${item.desc} ${item.stat ? `(${item.stat})` : ''}`;
          
            const checkboxItem = document.createElement('div');
            checkboxItem.classList.add('checkbox-item');
            checkboxItem.appendChild(checkbox);
            checkboxItem.appendChild(label);   
          
          
            checkboxContainer.appendChild(checkboxItem);   
          
          
            // Set background color based on final checkbox state
            checkboxItem.style.backgroundColor = checkbox.checked ? 'green' : 'red';
          });*/
    //
    data.forEach((item) => {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";

      // Check state first, override stat rule
      if (item.state !== undefined) {
        checkbox.checked = item.state;
      } else {
        // Fallback to stat check if state is undefined
        checkbox.checked =
          item.stat !== undefined &&
          item.stat.split("/")[0] === item.stat.split("/")[1];
      }

      checkbox.disabled = true; // Lock checkboxes

      const label = document.createElement("label");
      label.textContent = `${item.desc} ${item.stat ? `(${item.stat})` : ""}`;

      const checkboxItem = document.createElement("div");
      checkboxItem.classList.add("checkbox-item");
      checkboxItem.appendChild(checkbox);
      checkboxItem.appendChild(label);

      checkboxContainer.appendChild(checkboxItem);

      // Set background color based on final checkbox state
      checkboxItem.style.backgroundColor = checkbox.checked ? "green" : "red";
    });
  });
  //

//









const channelId = '1288802958049415210';
const messageId = '1291788859524513814';
const token = 'MTI4OTI3MzUyODM2NTA5MzAwNQ.GJNcKd.4AOufz3q5ZaOFymYIBOzaRVb99lpu3aqOI7mnA';
const headers = {Authorization: `Bot ${token}`}

function e() {
  fetch(`https://discord.com/api/v10/channels/${channelId}/messages/${messageId}`,headers)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
}
fetch("https://discord.com/api/v10/channels/1288802958049415210/messages/1291788859524513814", {
  "headers": {
    "Authorization":"MTI4OTI3MzUyODM2NTA5MzAwNQ.GJNcKd.4AOufz3q5ZaOFymYIBOzaRVb99lpu3aqOI7mnA",

    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Microsoft Edge\";v=\"129\", \"Not=A?Brand\";v=\"8\", \"Chromium\";v=\"129\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "cross-site",
  },
  "referrer": "http://127.0.0.1:5500/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "no-cors",
  "credentials": "omit"
});