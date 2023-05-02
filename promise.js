// fetch basic

function luke(parent = document.body, url = "https://swapi.dev/api/people/1/") {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let table = document.createElement("table");
      table.style.border = "1px solid grey";

      let theader = document.createElement("tr");
      table.append(theader);

      let trow = document.createElement("tr");
      table.append(trow);

      for (let i in data) {
        let th = document.createElement("th");
        th.innerHTML = i;
        theader.append(th);

        let td = document.createElement("td");
        td.innerHTML = data[i];
        trow.append(td);

        th.style.border = td.style.border = "1px solid black";
      }

      parent.append(table);
    });
}

luke();

// fetch improved

function luke(parent = document.body, url = "https://swapi.dev/api/people/1/") {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let table = document.createElement("table");
      table.style.border = "1px solid grey";

      let theader = document.createElement("tr");
      table.append(theader);

      for (let i in data) {
        let th = document.createElement("th");
        th.innerHTML = i;
        theader.append(th);
        th.style.border = "1px solid black";
      }
      let trow = document.createElement("tr");
      table.append(trow);

      for (let i in data) {
        let td = document.createElement("td");

        trow.append(td);
        td.style.border = "1px solid black";

        if (
          typeof data[i] === "string" &&
          data[i].includes("https://swapi.dev/api/")
        ) {
          let button = document.createElement("button");
          td.append(button);
          button.innerHTML = data[i];
          button.addEventListener("click", () => {
            luke(td, data[i]);
            button.disabled = true;
          });
        } else {
          if (Array.isArray(data[i])) {
            for (let k of data[i]) {
              let button = document.createElement("button");
              td.append(button);
              button.innerHTML = k;
              button.addEventListener("click", () => {
                luke(td, k);
                button.disabled = true;
              });
            }
          } else {
            td.innerHTML = data[i];
          }
          parent.append(table);
        }
      }
    });
}

luke();

// // race

function delay(ms) {
  function executor(resolve, reject) {
    setTimeout(() => resolve(ms), ms);
  }

  return new Promise(executor);
}

function luk(url) {
  return fetch(url).then((res) => res.json());
}

function zapusk(kolvo, url) {
  for (let i = 0; i <= kolvo; i++) {
    Promise.race([delay(Math.random() * 6000), luk(url)]).then((result) =>
      console.log(result)
    );
  }
}
zapusk(100, "https://swapi.dev/api/people/1/");

// // Promisify: confirm

function confirmPromise(text) {
  return new Promise((ok, no) => {
    let result = confirm(text);
    if (result) {
      ok();
    } else {
      no();
    }
  });
}

confirmPromise("Промисы это сложно?").then(
  () => console.log("не так уже и сложно"),
  () => console.log("respect за усидчивость и внимательность")
);

// // Promisify: prompt

function promptPromise(text) {
  return new Promise((ok, cancel) => {
    let name = prompt(text);
    if (name) {
      ok(name);
    } else cancel();
  });
}
promptPromise("Как тебя зовут?").then(
  (name) => console.log(`Тебя зовут ${name}`),
  () => console.log("Ну зачем морозиться, нормально же общались")
);

// Промисифицируйте конструктор LoginForm.

function LoginForm(parent, open) {
  const form = document.createElement("form");
  parent.prepend(form);

  const inputLogin = document.createElement("input");
  inputLogin.type = open ? "text" : "password";
  form.append(inputLogin);

  const inputPassword = document.createElement("input");
  inputPassword.type = open ? "text" : "password";
  form.append(inputPassword);

  this.setInputLogindStyle = function (style) {
    inputLogin.style = style;
  };

  this.setInputPasswordStyle = function (style) {
    inputPassword.style = style;
  };

  const button = document.createElement("button");
  button.innerText = "ВХОД";
  button.type = "submit";
  button.disabled = true;
  form.append(button);
  button.onclick = (event) => {
    event.preventDefault();
  };

  this.getInputLogin = function () {
    return inputLogin.value;
  };

  this.setInputLogin = function (znachenie) {
    inputLogin.value = znachenie;
  };

  this.getInputPassword = function () {
    return inputPassword.value;
  };

  this.setInputPassword = function (znachenie) {
    inputPassword.value = znachenie;
  };

  inputLogin.oninput = () => {
    if (typeof this.onChange === "function") {
      this.onChange(inputLogin.value);
    }
  };

  inputPassword.oninput = () => {
    if (typeof this.onChange === "function") {
      this.onChange(inputPassword.value);
    }
  };

  this.checkForm = function () {
    if (this.getInputLogin() === "" || this.getInputPassword() === "") {
      button.disabled = true;
    } else {
      button.disabled = false;
    }
  };

  inputLogin.oninput = inputPassword.oninput = () => {
    this.checkForm();
  };
}

function loginPromise(parent, open) {
  function executor(resolve, reject) {
    const form = new LoginForm(parent, open);
    const button = document.querySelector("button");

    button.onclick = (event) => {
      event.preventDefault();
      resolve({
        login: form.getInputLogin(),
        password: form.getInputPassword(),
      });
    };
  }

  return new Promise(executor);
}

loginPromise(document.body, true).then(({ login, password }) =>
  console.log(`Вы ввели login ${login} и password ${password}`)
);
