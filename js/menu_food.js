// Este script permite selecionar o tipo de itens do menu
// pretende listar
const menu_buttons = document.getElementsByClassName("menu-buttons")[0].children;

syncMenuItems();

Array.from(menu_buttons).forEach(function (item) {
    item.addEventListener('click', (e => {
        if (document.getElementsByClassName("category active").length == 1 && e.target.classList.contains("active") == true)
            return
        e.target.classList.toggle("active");
        syncMenuItems();
    }))
});

function syncMenuItems() {
    const cards = document.getElementsByClassName("card");
    const buttons = document.getElementsByClassName("category active");

    let categories = [];

    for (let item of buttons) {
        categories.push(item.dataset["category"]);
    }

    for (let card of cards) {
        if (!categories.includes(card.dataset["category"]))
            card.style.display = "none";
        else
            card.style.display = "flex";
    }

}