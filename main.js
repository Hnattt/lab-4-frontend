let equipment = [
    {
        id: 1,
        name: "Токарний верстат",
        manufacturer: "Металургійний завод",
        inventoryNumber: "T-12345",
        startDate: "2020-05-15",
        lifespan: "10 років"
    },
    {
        id: 2,
        name: "Фрезерний верстат",
        manufacturer: "Машинобудівний завод",
        inventoryNumber: "F-23456",
        startDate: "2018-09-20",
        lifespan: "12 років"
    },
    {
        id: 3,
        name: "Пробивний прес",
        manufacturer: "Пресове виробництво",
        inventoryNumber: "P-34567",
        startDate: "2019-03-10",
        lifespan: "15 років"
    }
];


let specification = [
    {
        id: 1,
        quantity: 50,
        name: "Шестерня",
        productionTime: "2 дні"
    },
    {
        id: 2,
        quantity: 200,
        name: "Прокладка",
        productionTime: "1 день"
    },
    {
        id: 3,
        quantity: 100,
        name: "Ролик",
        productionTime: "3 дні"
    }
];


let materials = [
    {
        id: 1,
        name: "Сталь",
        type: "Метал",
        pricePerUnit: "120 грн",
        unitOfMeasure: "кг/шт.",
        alternative: "Титан"
    },
    {
        id: 2,
        name: "Алюміній",
        type: "Метал",
        pricePerUnit: "200 грн",
        unitOfMeasure: "кг/шт.",
        alternative: "Магній"
    },
    {
        id: 3,
        name: "Пластик",
        type: "Полімер",
        pricePerUnit: "50 грн",
        unitOfMeasure: "кг/шт.",
        alternative: "Гума"
    }
];


let equipmentIdCounter = 4;
let specificationIdCounter = 4;
let materialsIdCounter = 4;


function fillTable() {

    const equipmentTab = document.getElementById('equipmentTableBody');
    equipmentTab.innerHTML = "";
    equipment.forEach(item => {
        equipmentTab.innerHTML += generateEquipmentRow(item);
    });


    const specificationTab = document.getElementById('specificationTableBody');
    specificationTab.innerHTML = "";
    specification.forEach(item => {
        specificationTab.innerHTML += generateSpecificationRow(item);
    });


    const materialTab = document.getElementById('materialTableBody');
    materialTab.innerHTML = "";
    materials.forEach(item => {
        materialTab.innerHTML += generateMaterialRow(item);
    });
}


function generateEquipmentRow(item) {
    return `
        <tr>
            <td>${item.name}</td>
            <td>${item.manufacturer}</td>
            <td>${item.inventoryNumber}</td>
            <td>${item.startDate}</td>
            <td>${item.lifespan}</td>
            <td>
                <button class="btn btn-warning" onclick="editEquipment(${item.id})">Редагувати</button>
                <button class="btn btn-danger" onclick="deleteEquipment(${item.id})">Видалити</button>
            </td>
        </tr>
    `;
}

function generateSpecificationRow(item) {
    return `
        <tr>
            <td>${item.quantity}</td>
            <td>${item.name}</td>
            <td>${item.productionTime}</td>
            <td>
                <button class="btn btn-warning" onclick="editSpecification(${item.id})">Редагувати</button>
                <button class="btn btn-danger" onclick="deleteSpecification(${item.id})">Видалити</button>
            </td>
        </tr>
    `;
}

function generateMaterialRow(item) {
    return `
        <tr>
            <td>${item.name}</td>
            <td>${item.type}</td>
            <td>${item.pricePerUnit}</td>
            <td>${item.unitOfMeasure}</td>
            <td>${item.alternative}</td>
            <td>
                <button class="btn btn-warning" onclick="editMaterial(${item.id})">Редагувати</button>
                <button class="btn btn-danger" onclick="deleteMaterial(${item.id})">Видалити</button>
            </td>
        </tr>
    `;
}


function addEquipment(data) {
    data.id = equipmentIdCounter++;
    equipment.push(data);
    fillTable();
}

function addSpecification(data) {
    data.id = specificationIdCounter++;
    specification.push(data);
    fillTable();
}

function addMaterial(data) {
    data.id = materialsIdCounter++;
    materials.push(data);
    fillTable();
}


function deleteEquipment(id) {
    equipment = equipment.filter(item => item.id !== id);
    fillTable();
}

function deleteSpecification(id) {
    specification = specification.filter(item => item.id !== id);
    fillTable();
}

function deleteMaterial(id) {
    materials = materials.filter(item => item.id !== id);
    fillTable();
}


function editEquipment(id) {
    const item = equipment.find(e => e.id === id);
    if (item) openEquipmentModal(item);
}

function editSpecification(id) {
    const item = specification.find(s => s.id === id);
    if (item) openSpecificationModal(item);
}

function editMaterial(id) {
    const item = materials.find(m => m.id === id);
    if (item) openMaterialModal(item);
}


function openEquipmentModal(item) {
    document.getElementById('equipmentName').value = item.name;
    document.getElementById('equipmentManufacturer').value = item.manufacturer;
    document.getElementById('equipmentInventoryNumber').value = item.inventoryNumber;
    document.getElementById('equipmentStartDate').value = item.startDate;
    document.getElementById('equipmentLifespan').value = item.lifespan;

    $('#addEquipmentModal').modal('show');

    const form = document.getElementById('addEquipmentForm');
    form.onsubmit = function (e) {
        e.preventDefault();
        item.name = document.getElementById('equipmentName').value;
        item.manufacturer = document.getElementById('equipmentManufacturer').value;
        item.inventoryNumber = document.getElementById('equipmentInventoryNumber').value;
        item.startDate = document.getElementById('equipmentStartDate').value;
        item.lifespan = document.getElementById('equipmentLifespan').value;
        $('#addEquipmentModal').modal('hide');
        fillTable();
    };
}

function openSpecificationModal(item) {
    document.getElementById('specificationQuantity').value = item.quantity;
    document.getElementById('specificationName').value = item.name;
    document.getElementById('specificationDuration').value = item.productionTime;  // Ось тут виправлено

    $('#addSpecificationModal').modal('show');

    const form = document.getElementById('addSpecificationForm');
    form.onsubmit = function (e) {
        e.preventDefault();
        item.quantity = document.getElementById('specificationQuantity').value;
        item.name = document.getElementById('specificationName').value;
        item.productionTime = document.getElementById('specificationDuration').value;  // Ось тут виправлено
        $('#addSpecificationModal').modal('hide');
        fillTable();
    };
}


function openMaterialModal(item) {
    document.getElementById('materialName').value = item.name;
    document.getElementById('materialType').value = item.type;
    document.getElementById('materialPrice').value = item.pricePerUnit;
    document.getElementById('materialUnit').value = item.unitOfMeasure;
    document.getElementById('materialAlternative').value = item.alternative;

    $('#addMaterialModal').modal('show');

    const form = document.getElementById('addMaterialForm');
    form.onsubmit = function (e) {
        e.preventDefault();
        item.name = document.getElementById('materialName').value;
        item.type = document.getElementById('materialType').value;
        item.pricePerUnit = document.getElementById('materialPrice').value;
        item.unitOfMeasure = document.getElementById('materialUnit').value;
        item.alternative = document.getElementById('materialAlternative').value;
        $('#addMaterialModal').modal('hide');
        fillTable();
    };
}


window.onload = function () {
    fillTable();


    document.getElementById('addEquipmentForm').onsubmit = function (e) {
        e.preventDefault();
        const data = {
            name: document.getElementById('equipmentName').value,
            manufacturer: document.getElementById('equipmentManufacturer').value,
            inventoryNumber: document.getElementById('equipmentInventoryNumber').value,
            startDate: document.getElementById('equipmentStartDate').value,
            lifespan: document.getElementById('equipmentLifespan').value
        };
        addEquipment(data);
        $('#addEquipmentModal').modal('hide');
        e.target.reset();
    };


document.getElementById('addSpecificationForm').onsubmit = function (e) {
    e.preventDefault();
    const data = {
        quantity: document.getElementById('specificationQuantity').value,
        name: document.getElementById('specificationName').value,
        productionTime: document.getElementById('specificationDuration').value // виправлено
    };
    addSpecification(data);
    $('#addSpecificationModal').modal('hide');
    e.target.reset();
};



    document.getElementById('addMaterialForm').onsubmit = function (e) {
        e.preventDefault();
        const data = {
            name: document.getElementById('materialName').value,
            type: document.getElementById('materialType').value,
            pricePerUnit: document.getElementById('materialPrice').value,
            unitOfMeasure: document.getElementById('materialUnit').value,
            alternative: document.getElementById('materialAlternative').value
        };
        addMaterial(data);
        $('#addMaterialModal').modal('hide');
        e.target.reset();
    };
};
