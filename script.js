class MouseCursor {
  constructor() {
    this.page = document.querySelector('#page');

    const cursor = document.querySelector('.c-cursor__pointer');

    TweenLite.to(cursor, {
      autoAlpha: 0,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  moveMousePos(e) {
    const mousePosX = e.clientX;
    const mousePosY = e.clientY;
    const cursor = document.querySelector('.c-cursor__pointer');
    
    if (e.target.classList.contains('c-magnetic')) return;

    TweenLite.to(cursor, 0.5, {
      x: mousePosX,
      y: mousePosY,
      ease: Power4.easeOut,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  enterMouse() {
    const cursor = document.querySelector('.c-cursor__pointer');

    TweenLite.to(cursor, 1, {
      autoAlpha: 1,
      ease: Power4.easeIn,
    });
  }

  handleMousePos() {
    this.page.addEventListener('mouseenter', this.enterMouse);
    this.page.addEventListener('mousemove', this.moveMousePos, false);
  }

  // eslint-disable-next-line class-methods-use-this
  updateOnHover(e) {
    const { tagName, classList } = e.target;

    if (tagName === 'LABEL' ||
      tagName === 'A' ||
      tagName === 'BUTTON' ||
      classList.contains('is-cursor-hover') ||
      (e.target.parentElement.tagName === 'A' && e.target.tagName === 'IMG')
    ) {
      document.querySelector('html').classList.toggle('is-hover');
    }
  }

  handleLinkHover() {
    this.page.addEventListener('mouseover', this.updateOnHover.bind(this));
    this.page.addEventListener('mouseout', this.updateOnHover.bind(this));
  }

  render() {
    this.handleMousePos();
    this.handleLinkHover();
  }
}

class MagneticCursor {
  constructor() {
    this.links = [...document.querySelectorAll('.c-magnetic')];
    this.cursor = document.querySelector('.c-cursor__pointer');
    this.pos = { x: 0, y: 0 };
  }
  
  activateMagnetic() {
    this.links.map(link => {
      const that = this;
      link.addEventListener('mousemove', function(e) {
        that.moveTarget(e, this, this.querySelector('span'), 50);
        that.moveCursor(e, this, 1.5);
      });
      
      link.addEventListener('mouseout', function() {
        TweenMax.to(this.querySelector('span'), 0.3, {
          x: 0,
          y: 0
        });
      });
    });
  }
  
  moveCursor(e, link, force) {
    var rect = link.getBoundingClientRect();
    var relX = e.pageX - rect.left;
    var relY = e.pageY - rect.top;
    this.pos.x = rect.left + rect.width / 2 + (relX - rect.width / 2) / force;
    this.pos.y = rect.top + rect.height / 2 + (relY - rect.height / 2) / force;

    TweenMax.to(this.cursor, 0.3, {
      x: this.pos.x,
      y: this.pos.y
    });
  }
  
  moveTarget(e, link, span, force) {
    var boundingRect = link.getBoundingClientRect();
    var relX = e.pageX - boundingRect.left;
    var relY = e.pageY - boundingRect.top;

    TweenMax.to(span, 0.3, {
      x: (relX - boundingRect.width / 2) / boundingRect.width * force,
      y: (relY - boundingRect.height / 2) / boundingRect.height * force,
      ease: Power2.easeOut
    });
  }
  
  render() {
    this.activateMagnetic();
  }
}

const mouseCursor = new MouseCursor();
const magneticCursor = new MagneticCursor();

mouseCursor.render();
magneticCursor.render();
