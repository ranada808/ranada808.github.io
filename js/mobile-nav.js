/* Keep page links usable; separate buttons open their child navigation. */
(function () {
  'use strict';

  document.querySelectorAll('nav').forEach(function (nav, navIndex) {
    var menu = nav.querySelector(':scope > ul');
    if (!menu) return;

    menu.id = menu.id || 'site-menu-' + navIndex;
    nav.setAttribute('aria-label', 'Main navigation');

    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'menu-toggle';
    toggle.textContent = 'Menu';
    toggle.setAttribute('aria-controls', menu.id);
    toggle.setAttribute('aria-expanded', 'false');
    nav.insertBefore(toggle, menu);

    function closeSubmenus() {
      nav.querySelectorAll('.submenu-toggle').forEach(function (button) {
        button.setAttribute('aria-expanded', 'false');
        button.parentElement.classList.remove('submenu-open');
      });
    }

    function closeMenu() {
      nav.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
      closeSubmenus();
    }

    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', String(open));
      if (!open) closeSubmenus();
    });

    menu.querySelectorAll('li').forEach(function (item, itemIndex) {
      var submenu = item.querySelector(':scope > ul');
      var link = item.querySelector(':scope > a');
      if (!submenu || !link) return;

      submenu.id = submenu.id || 'submenu-' + navIndex + '-' + itemIndex;
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'submenu-toggle';
      button.textContent = '\u25be';
      button.setAttribute('aria-label', link.textContent.trim() + ' submenu');
      button.setAttribute('aria-controls', submenu.id);
      button.setAttribute('aria-expanded', 'false');
      item.insertBefore(button, submenu);

      button.addEventListener('click', function () {
        var open = button.getAttribute('aria-expanded') !== 'true';
        closeSubmenus();
        item.classList.toggle('submenu-open', open);
        button.setAttribute('aria-expanded', String(open));
      });

      item.addEventListener('pointerenter', function (event) {
        if (event.pointerType !== 'mouse' || window.matchMedia('(max-width: 767px)').matches) return;
        closeSubmenus();
        item.classList.add('submenu-open');
        button.setAttribute('aria-expanded', 'true');
      });

      item.addEventListener('pointerleave', function (event) {
        if (event.pointerType === 'mouse' && !item.contains(document.activeElement)) {
          item.classList.remove('submenu-open');
          button.setAttribute('aria-expanded', 'false');
        }
      });

      item.addEventListener('focusout', function (event) {
        // Keep sibling buttons in place until their touch click is delivered.
        if (!nav.contains(event.relatedTarget)) {
          item.classList.remove('submenu-open');
          button.setAttribute('aria-expanded', 'false');
        }
      });
    });

    nav.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape') return;
      var submenu = event.target.closest('.submenu-open');
      if (submenu) {
        var button = submenu.querySelector(':scope > .submenu-toggle');
        closeSubmenus();
        button.focus();
      } else {
        closeMenu();
        if (window.matchMedia('(max-width: 767px)').matches) toggle.focus();
      }
    });

    document.addEventListener('click', function (event) {
      if (!nav.contains(event.target)) closeMenu();
    });

    window.matchMedia('(max-width: 767px)').addEventListener('change', closeMenu);
    nav.classList.add('nav-enhanced');
  });

  document.querySelectorAll('#main table').forEach(function (table) {
    if (table.querySelector('div.img')) {
      table.classList.add('product-table');
      table.querySelectorAll('td').forEach(function (cell) {
        if (!cell.querySelector('div.img')) cell.classList.add('gallery-spacer');
      });
    } else if (!table.closest('form')) {
      var wrapper = document.createElement('div');
      wrapper.className = 'table-scroll';
      wrapper.tabIndex = 0;
      wrapper.setAttribute('role', 'region');
      wrapper.setAttribute('aria-label', document.title + ' table; scroll for more columns');
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    }
  });
})();
