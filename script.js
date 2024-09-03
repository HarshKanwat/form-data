document.addEventListener('DOMContentLoaded', () => {
    const formContainer = document.createElement('div');
    formContainer.className = 'margin';

    const row = document.createElement('div');
    row.className = 'row modified d-flex justify-content-between';

    const formCol = document.createElement('div');
    formCol.className = 'col-sm-12 col-md-12 col-lg-3';

    const form = document.createElement('form');
    form.className = 'mt-3 mb-5 form-style';

    const formTitle = document.createElement('h1');
    formTitle.textContent = 'Form Submission:';
    form.appendChild(formTitle);

    const fields = [
        { label: 'First Name:', type: 'text', id: 'fname', placeholder: 'First Name' },
        { label: 'Last Name:', type: 'text', id: 'lname', placeholder: 'Last Name' },
        { label: 'Address Line 1:', type: 'text', id: 'address1', placeholder: 'Address Line 1' },
        { label: 'Address Line 2:', type: 'text', id: 'address2', placeholder: 'Address Line 2' },
        { label: 'PIN:', type: 'number', id: 'pin', placeholder: 'PIN' },
        { label: 'State:', type: 'text', id: 'state', placeholder: 'State' },
        { label: 'Country:', type: 'text', id: 'country', placeholder: 'Country' }
    ];

    fields.forEach(field => {
        const label = document.createElement('label');
        label.setAttribute('for', field.id);
        label.textContent = field.label;
        form.appendChild(label);

        const input = document.createElement('input');
        input.type = field.type;
        input.id = field.id;
        input.name = field.id;
        input.className = 'form-control';
        input.placeholder = field.placeholder;
        form.appendChild(input);

        form.appendChild(document.createElement('br'));
    });

    const genderLabel = document.createElement('label');
    genderLabel.textContent = 'Gender:';
    form.appendChild(genderLabel);
    form.appendChild(document.createElement('br'));

    const genders = [
        { value: 'male', text: 'Male' },
        { value: 'female', text: 'Female' }
    ];

    genders.forEach(gender => {
        const input = document.createElement('input');
        input.type = 'radio';
        input.id = 'gender';
        input.name = 'gender';
        input.value = gender.value;
        input.className = 'gender m-2 mb-2';
        form.appendChild(input);

        const text = document.createTextNode(gender.text);
        form.appendChild(text);
    });

    form.appendChild(document.createElement('br'));
    form.appendChild(document.createElement('br'));

    const foodLabel = document.createElement('label');
    foodLabel.textContent = 'Choice of Food: ';
    const span = document.createElement('span');
    span.className = 'span';
    span.textContent = '(must choose at least 2 out of 5 options)';
    foodLabel.appendChild(span);
    form.appendChild(foodLabel);
    form.appendChild(document.createElement('br'));

    const foods = [
        { value: 'north Indian', text: 'North Indian' },
        { value: 'south Indian', text: 'South Indian' },
        { value: 'chinese', text: 'Chinese' },
        { value: 'japanese', text: 'Japanese' },
        { value: 'sea-food', text: 'Sea Food' }
    ];

    foods.forEach(food => {
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.name = 'food';
        input.value = food.value;
        input.id = 'food';
        input.className = 'food m-2';
        form.appendChild(input);

        const text = document.createTextNode(food.text);
        form.appendChild(text);
        form.appendChild(document.createElement('br'));
    });

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.id = 'submit';
    submitButton.className = 'form-control btn btn-secondary';
    submitButton.textContent = 'Submit';
    form.appendChild(submitButton);

    formCol.appendChild(form);
    row.appendChild(formCol);

    const tableCol = document.createElement('div');
    tableCol.className = 'col col-sm-12 col-md-12 col-lg-8';

    const tableTitle = document.createElement('h1');
    tableTitle.textContent = 'Temporary Database';
    tableCol.appendChild(tableTitle);
    tableCol.appendChild(document.createElement('br'));

    const table = document.createElement('table');
    table.className = 'table table-striped';

    const thead = document.createElement('thead');
    thead.className = 'bg-dark text-light';

    const headerRow = document.createElement('tr');
    const headers = ['First Name', 'Last Name', 'Address', 'Pincode', 'Gender', 'Food', 'State', 'Country'];

    headers.forEach(header => {
        const th = document.createElement('td');
        th.textContent = header;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    tbody.className = 'tbody';
    tbody.id = 'tbody';
    table.appendChild(tbody);

    tableCol.appendChild(table);
    row.appendChild(tableCol);

    formContainer.appendChild(row);
    document.body.appendChild(formContainer);

    // Form submission handling
    const submit = document.getElementById("submit");
    submit.addEventListener("click", function(e) {
        e.preventDefault();
        let address = [];
        address.push(address1.value);
        address.push(address2.value);

        let gender = document.getElementsByName("gender");
        let genderValue;
        for (let i = 0; i < gender.length; i++) {
            if (gender[i].checked) {
                genderValue = gender[i].value;
            }
        }

        let food = document.getElementsByName("food");
        let foodList = [];
        let foodCount = 0;
        console.log(food);
        for (let i = 0; i < food.length; i++) {
            if (food[i].checked) {
                foodList.push(food[i].value);
                foodCount++;
            }
        }
        let result;
        if (foodList.length >= 2) {
            result = foodList.join(", ");
        } else {
            result = alert("Choose at least 2 options out of 5 in food");
        }

        createTable(fname.value, lname.value, address.join(" "), pin.value, genderValue, result, state.value, country.value);
        fname.value = "";
        lname.value = "";
        address1.value = "";
        address2.value = "";
        pin.value = "";
        gender.value = "";
        foodList = [];
        state.value = "";
        country.value = "";
    });

    const fname = document.getElementById("fname");
    const lname = document.getElementById("lname");
    const address1 = document.getElementById("address1");
    const address2 = document.getElementById("address2");
    const pin = document.getElementById("pin");
    const gender = document.getElementById("gender");
    const food = document.getElementById("food");
    const state = document.getElementById("state");
    const country = document.getElementById("country");

    function createTable(fname, lname, address, pincode, gender, food, state, country) {
        const tbody = document.getElementById("tbody");
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        const td4 = document.createElement("td");
        const td5 = document.createElement("td");
        const td6 = document.createElement("td");
        const td7 = document.createElement("td");
        const td8 = document.createElement("td");
        td1.innerHTML = fname;
        td2.innerHTML = lname;
        td3.innerHTML = address;
        td4.innerHTML = pincode;
        td5.innerHTML = gender;
        td6.innerHTML = food;
        td7.innerHTML = state;
        td8.innerHTML = country;
        tr.append(td1);
        tr.append(td2);
        tr.append(td3);
        tr.append(td4);
        tr.append(td5);
        tr.append(td6);
        tr.append(td7);
        tr.append(td8);
        tbody.append(tr);
    }
});
