const players = document.querySelector('.players');
const template = document.querySelector('.template');
const menuOptions = document.querySelector('.dropdown__list');

class Menu {
  constructor() {
    this.element = document.querySelector('.dropdown');
    this.primaryColor = '#ececff';
  }

  hide() {
    this.highlight.style.backgroundColor = '';
    this.element.hidden = true;
  }

  show() {
    this.element.hidden = false;
  }

  isShowed() {
    return !this.element.hidden;
  }

  highlightRow(node) {
    this.highlight = node;
    node.style.backgroundColor = this.primaryColor;
  }

  getTarget() {
    return this.target;
  }

  setTarget(node) {
    this.target = node;
  }

  render() {
    this.show();

    const mouseCoords = {
      x: event.pageX,
      y: event.pageY
    };

    this.element.style.left = `${mouseCoords.x}px`;
    this.element.style.top = `${mouseCoords.y}px`;
    const menuCoords = this.element.getBoundingClientRect();
    const clientHeight = document.documentElement.clientHeight;

    if (menuCoords.top + this.element.offsetHeight > clientHeight) {
      this.element.style.top = parseInt(this.element.style.top, 10) - this.element.offsetHeight + 'px';
    }
  }
}


const menu = new Menu();

if (players) {
  players.addEventListener('click', (event) => {
    const target = event.target.parentNode;

    if (menu.isShowed()) {
      menu.hide();

      return;
    };

    if (target.classList.contains('row')) {
      menu.setTarget(target);
      menu.highlightRow(target);
      menu.render();
    }
  });

  players.addEventListener('mousewheel', () => {
    if (menu.isShowed()) {
      menu.hide();
    };
  });
}

if (menuOptions) {
  menuOptions.addEventListener('click', ({ target }) => {
    if (target && target.classList.contains('dropdown__item')) {
      const row = menu.getTarget();
      const id = parseInt(row.querySelector('.id').innerText, 10);
      alt.emit('playersList:optionExecute', id, target.innerText);
      menu.hide();
    }
  });
}

if ('alt' in window) {
  window.alt.emit('playersList:loaded');

  window.alt.on('playersList:show', () => document.body.hidden = false);

  window.alt.on('playersList:hide', () => {
    document.body.hidden = true;

    if (menu.isShowed()) {
      menu.hide();
    };
  });

  window.alt.on('playersList:setPlayers', (allPlayers) => {
    if (players) {
      players.innerHTML = '';
    }

    allPlayers.forEach(player => {
      if (template && players) {
        const clone = template.cloneNode(true);
        clone.hidden = false;
        clone.querySelector('.id').innerText = player.id;
        clone.querySelector('.name').innerText = player.name;
        clone.querySelector('.ping').innerText = player.ping;
        clone.querySelector('.world').innerText = player.world;

        players.append(clone);
      }
    });
  });

  window.alt.on('playersList:setOptions', (options) => {
    options.forEach(label => {
      const li = document.createElement('li');
      li.className = 'dropdown__item';
      li.innerText = label;

      if (menuOptions) {
        menuOptions.append(li);
      }
    });
  });
}
