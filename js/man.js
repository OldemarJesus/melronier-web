// Toogle display none on .menu-items
const menu_items = document.getElementsByClassName("menu-items")[0];
const btn = document.getElementsByClassName("menu-bars")[0];

btn.addEventListener("click", function() {
    menu_items.style.display = menu_items.style.display === 'none' ? 'block' : 'none';
})