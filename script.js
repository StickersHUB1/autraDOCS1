fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const tabButtonsContainer = document.getElementById('tab-buttons');
    const tabContentContainer = document.getElementById('tab-content');

    // Generar botones y contenido
    data.forEach((section, index) => {
      const button = document.createElement('button');
      button.className = 'tab-button' + (index === 0 ? ' active' : '');
      button.dataset.tab = section.id;
      button.textContent = section.buttonText;
      tabButtonsContainer.appendChild(button);

      const tab = document.createElement('section');
      tab.id = section.id;
      tab.className = 'tab' + (index === 0 ? ' active' : '');
      tab.innerHTML = `
        <h1>${section.title}</h1>
        ${section.content
          .map(content => `
            <div class="glass-box">
              <h2>${content.subtitle}</h2>
              ${
                content.type === 'paragraph'
                  ? `<p class="corporate-message">${content.items.join('')}</p>`
                  : `<${content.type === 'ordered' ? 'ol' : 'ul'}>
                      ${content.items.map(item => `<li>${item}</li>`).join('')}
                    </${content.type === 'ordered' ? 'ol' : 'ul'}>`
              }
            </div>
          `)
          .join('')}
      `;
      tabContentContainer.appendChild(tab);
    });

    // Manejar clics en los botones
    const buttons = document.querySelectorAll('.tab-button');
    const tabs = document.querySelectorAll('.tab');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        tabs.forEach(tab => tab.classList.remove('active'));
        button.classList.add('active');
        document.getElementById(button.dataset.tab).classList.add('active');
        localStorage.setItem('activeTab', button.dataset.tab); // Guardar pestaña activa
      });
    });

    // Restaurar pestaña activa desde localStorage
    const activeTab = localStorage.getItem('activeTab') || data[0].id;
    buttons.forEach(btn => btn.classList.remove('active'));
    tabs.forEach(tab => tab.classList.remove('active'));
    document.querySelector(`[data-tab="${activeTab}"]`)?.classList.add('active');
    document.getElementById(activeTab)?.classList.add('active');
  })
  .catch(error => console.error('Error cargando data.json:', error));