const order = {
    soup: null,
    main: null,
    salad: null,
    drink: null,
    dessert: null
};

const emptyTexts = {
    soup: 'Блюдо не выбрано',
    main: 'Блюдо не выбрано',
    salad: 'Салат не выбран',
    drink: 'Напиток не выбран',
    dessert: 'Десерт не выбран'
};

function countChosen() {
    let count = 0;
    Object.values(order).forEach(function (dish) {
        if (dish !== null) {
            count += 1;
        }
    });
    return count;
}

function totalPrice() {
    let total = 0;
    Object.values(order).forEach(function (dish) {
        if (dish !== null) {
            total += dish.price;
        }
    });
    return total;
}

function updateCategory(category, visible) {
    const dish = order[category];
    const block = document.getElementById('order-' + category);
    if (!block) {
        return;
    }
    const text = block.querySelector('.order-category-dish');
    const field = document.getElementById('input-' + category);
    block.hidden = !visible;
    if (dish === null) {
        text.textContent = emptyTexts[category];
        if (field) {
            field.value = '';
        }
    } else {
        text.textContent = dish.name + ' ' + dish.price + '₽';
        if (field) {
            field.value = dish.keyword;
        }
    }
}

function updateOrderBlock() {
    const chosen = countChosen();
    const empty = document.getElementById('order-empty');
    const total = document.getElementById('order-total');
    if (!empty || !total) {
        return;
    }
    empty.hidden = chosen !== 0;
    total.hidden = chosen === 0;
    Object.keys(order).forEach(function (category) {
        updateCategory(category, chosen !== 0);
    });
    if (chosen !== 0) {
        const value = document.getElementById('order-total-value');
        if (value) {
            value.textContent = totalPrice() + '₽';
        }
    }
}

function refreshSelection() {
    document.querySelectorAll('.dish').forEach(function (card) {
        const keyword = card.dataset.dish;
        const dish = dishes.find(function (item) {
            return item.keyword === keyword;
        });
        const chosen = dish && order[dish.category] !== null
            && order[dish.category].keyword === keyword;
        card.classList.toggle('selected', Boolean(chosen));
    });
}

function onAddButtonClick(event) {
    const card = event.target.closest('.dish');
    if (!card) {
        return;
    }
    const dish = dishes.find(function (item) {
        return item.keyword === card.dataset.dish;
    });
    if (!dish) {
        return;
    }
    order[dish.category] = dish;
    refreshSelection();
    updateOrderBlock();
}

document.addEventListener('click', function (event) {
    const button = event.target.closest('.dish button');
    if (button) {
        onAddButtonClick(event);
    }
});

updateOrderBlock();
