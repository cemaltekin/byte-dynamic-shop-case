
// veriler oluşturuldu

const products = [
    {
        id: 1,
        img_url: "../assets/images/ayakkabi.webp",
        name: "LOAFER AYAKKABI",
        price: {
            current: "834.90",
        },
        type: "shoes",
    },
    {
        id: 2,
        img_url: "../assets/images/yelek.webp",
        name: "YELEK",
        price: {
            old: "439.90",
            current: "395.91",
        },
        type: "waistcoat",
    },
    {
        id: 3,
        img_url: "../assets/images/pantolon.webp",
        name: "PANTOLON",
        price: {
            old: "519.90",
            current: "467.91",
        },
        type: "trousers",
    },
    {
        id: 4,
        img_url: "../assets/images/ceket.webp",
        name: "OVERSIZE CEKET",
        price: {
            old: "739.90",
            current: "665.91",
        },
        type: "jacket",
    },
]

// slider seçildi
const slider = document.querySelector('.slider');

// ürünler döngüye sokuldu ve slider'a append edildi
products.forEach((product) => {
    const item = document.createElement('div');
    item.classList = 'item w-full mr-2.5';

    const img = document.createElement('img');
    img.classList = "w-full"
    img.src = product.img_url;
    img.alt = product.name;
    item.appendChild(img);

    const content = document.createElement('div');
    content.classList = 'py-5 flex flex-col items-center';
    item.appendChild(content);

    const name = document.createElement('h3');
    name.classList = 'product_name text-lg';
    name.textContent = product.name;
    content.appendChild(name);

    const prices = document.createElement('div');
    prices.classList = ('flex items-center gap-3');
    content.appendChild(prices);

    if (product.price.old) {
        const oldPrice = document.createElement('span');
        oldPrice.classList = 'product_price text-center line-through text-gray-400 text-lg';
        oldPrice.textContent = `₺${product.price.old}`;
        prices.appendChild(oldPrice);
    }

    const currentPrice = document.createElement('span');
    currentPrice.classList = 'text-lg product_price text-center';
    currentPrice.textContent = `₺${product.price.current}`;
    prices.appendChild(currentPrice);

    const button = document.createElement('a');
    button.classList = 'view_btn max-w-max inline-flex mt-4 items-center justify-center px-5 py-3 border';
    button.textContent = 'QUICK VIEW';
    content.appendChild(button);

    slider.appendChild(item);
});

// dotlar oluşturuldu ve tipler ile currenindex eşleştirildi
const dotContainer = document.querySelector('.dot-container');
const productTypes = {};

products.forEach(product => {
    const productType = product.type;
    if (!productTypes[productType]) {
        productTypes[productType] = true;
        const dot = document.createElement('div');
        dot.classList.add('dot', productType);
        if (Object.keys(productTypes).length === 1) {
            dot.classList.add('active');
        }
        dotContainer.appendChild(dot);
    }
});

const dots = document.querySelectorAll('.dot');

dots.forEach((dot, index) => {
    //dotlara tıklandığında bir attribute atandı ve currentindex ile eşleştirildi gerekli dot'a active classı atandı
    dot.setAttribute('data-index', index);
    dot.addEventListener('click', () => {
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        dot.classList.add('active');
        const index = parseInt(dot.getAttribute('data-index'));
        slider.scrollLeft = index * itemWidth;
        updateActiveDot()
    });
});

// dotların güncellenmesi için fonksiyon yazıldı
function updateActiveDot() {
    setTimeout(() => {
        const activeItem = Math.floor(slider.scrollLeft / itemWidth) + 1;
        const activeDot = dotContainer.querySelector(`.dot:nth-child(${activeItem})`);
        const totalProduct = products.length;
        const slideIndex = document.getElementById("slideIndex")
        slideIndex.textContent = `${activeItem} / ${totalProduct}`

        if (activeDot) {
            dots.forEach(dot => dot.classList.remove('active'));
            activeDot.classList.add('active');
        }
    }, 500);
}

// slider geçişleri için gerekli alan oluşturuldu ve işlevsellikleri yazıldı

let isDown = false;
let startX;
let scrollLeft;
// geçiş için gerekli alan hesaplandı
const itemWidth = slider.querySelector('.item').offsetWidth;

const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

// geri butonu
prevButton.addEventListener('click', () => {
    slider.scrollLeft -= itemWidth;
    updateActiveDot()
});
// ileri butonu
nextButton.addEventListener('click', () => {
    slider.scrollLeft += itemWidth;
    updateActiveDot()
});

// sürükleme işlevleri 
slider.addEventListener('mousedown', (e) => {
    isDown = true;
    if (isDown) {
        //isdown true ise cursor grab yapıldı
        slider.style.cursor = "grab";
    }
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
    isDown = false;
});

slider.addEventListener('mouseup', () => {
    isDown = false;
    //mouse bırakıldığında cursor normale döndürüldü
    slider.style.cursor = "auto"
});

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3;
    slider.scrollLeft = scrollLeft - walk;
    updateActiveDot();
});

// update fonksiyonu sayfa açıldığında sayfa numaraları ve active dot için çalıştırıldı
updateActiveDot()
