const checkboxContainer = document.getElementById('checkbox-container');

fetch('data.json')
    .then(response => response.json())
    .then(data => {
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
          data.forEach(item => {
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
          });
    });