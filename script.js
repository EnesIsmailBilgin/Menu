// Sample Data (Ideally would come from a backend or JSON)
// NOTE: Using Google's model-viewer example assets as placeholders because we need hosted .glb files
const menuItems = [
    {
        id: 1,
        name: "Klasik Burger",
        category: "Burgerler",
        price: "240 ₺",
        description: "Dana eti, çedar peyniri, marul ve özel sos ile hazırlanan klasik lezzet.",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60",
        // Using common placeholder GLB from ModelViewer.dev
        model: "https://modelviewer.dev/shared-assets/models/Astronaut.glb", // Using astronaut as temp placeholder - normally would be burger.glb
        iosModel: "https://modelviewer.dev/shared-assets/models/Astronaut.usdz"
    },
    {
        id: 2,
        name: "Pepperoni Pizza",
        category: "Pizzalar",
        price: "320 ₺",
        description: "İtalyan hamuru, bol mozerella ve özel baharatlı sucuk.",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=500&q=60",
        model: "https://modelviewer.dev/shared-assets/models/NeilArmstrong.glb", // Placeholder
        iosModel: ""
    },
    {
        id: 3,
        name: "Izgara Tavuk",
        category: "Ana Yemekler",
        price: "210 ₺",
        description: "Özel marinasyonlu tavuk göğsü, pilav ve közlenmiş biber eşliğinde.",
        image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=500&q=60",
        model: "https://modelviewer.dev/shared-assets/models/RobotExpressive.glb", // Placeholder
        iosModel: ""
    },
    {
        id: 4,
        name: "Cheesecake",
        category: "Tatlılar",
        price: "180 ₺",
        description: "Orman meyveli sos ile servis edilen New York usulü cheesecake.",
        image: "https://images.unsplash.com/photo-1524351199678-c41985b77927?auto=format&fit=crop&w=500&q=60",
        model: "https://modelviewer.dev/shared-assets/models/shishkebab.glb", // This one is actually food!
        iosModel: ""
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const menuGrid = document.getElementById('menu-grid');
    const modal = document.getElementById('ar-modal');
    const closeModal = document.getElementById('close-modal');

    // Elements inside modal to update
    const viewer = document.getElementById('viewer');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalPrice = document.getElementById('modal-price');

    // Render Menu Items
    function renderMenu() {
        menuGrid.innerHTML = '';
        menuItems.forEach(item => {
            const card = document.createElement('div');
            card.className = 'menu-card';
            card.onclick = () => openARModal(item);

            card.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="card-image">
                <div class="card-info">
                    <h3>${item.name}</h3>
                    <p>${item.description.substring(0, 50)}...</p>
                    <div class="price-box">
                        <span class="price">${item.price}</span>
                        <div class="ar-icon">📦</div>
                    </div>
                </div>
            `;
            menuGrid.appendChild(card);
        });
    }

    // Open Modal and Setup Model Viewer
    function openARModal(item) {
        modalTitle.innerText = item.name;
        modalDesc.innerText = item.description;
        modalPrice.innerText = item.price;

        // Update Model Source
        viewer.src = item.model;
        if (item.iosModel) {
            viewer.setAttribute('ios-src', item.iosModel);
        } else {
            viewer.removeAttribute('ios-src');
        }

        // Add PC AR Button functionality (Dynamic Button Injection)
        let pcBtn = document.getElementById('pc-ar-btn');
        if (!pcBtn) {
            // If button doesn't exist, create it next to the AR button in DOM or inject it
            // For model-viewer, slots are tricky. We'll append it to the modal content instead of inside model-viewer to avoid slot issues
            const btnContainer = document.querySelector('.model-container');
            pcBtn = document.createElement('button');
            pcBtn.id = 'pc-ar-btn';
            pcBtn.className = 'pc-ar-btn glass-btn';
            pcBtn.innerText = '💻 PC\'de Test Et';
            // Styling for the new button
            pcBtn.style.position = 'absolute';
            pcBtn.style.bottom = '20px'; // align with AR button
            pcBtn.style.right = '20px';
            pcBtn.style.zIndex = '100';
            pcBtn.style.padding = '10px 20px';
            pcBtn.style.borderRadius = '25px';
            pcBtn.style.border = 'none';
            pcBtn.style.background = '#ffd93d';
            pcBtn.style.color = '#1a1a2e';
            pcBtn.style.fontWeight = 'bold';
            pcBtn.style.cursor = 'pointer';

            btnContainer.appendChild(pcBtn);
        }

        pcBtn.onclick = () => {
            window.location.href = `pc-ar.html?model=${encodeURIComponent(item.model)}&name=${encodeURIComponent(item.name)}`;
        };

        // Show Modal
        modal.classList.remove('hidden');
    }

    // Close Modal
    closeModal.onclick = () => {
        modal.classList.add('hidden');
        // Stop any audio or animations if necessary
    };

    // Close on click outside
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.classList.add('hidden');
        }
    };

    renderMenu();
});
