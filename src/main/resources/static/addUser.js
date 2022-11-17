$(async function () {
  await createUser()
});

const urlRoles = "http://localhost:8080/api/roles"
let newUserSelect = $('#addRole')
const newForm = document.forms["newUserForm"]

async function createUser() {
  fetch(urlRoles)
  .then(res => res.json())
  .then(roles => {
    roles.forEach(role => {
      let el = document.createElement("option");
      el.text = role.name.replaceAll("ROLE_", " ")
      el.value = role.id
      newUserSelect.append(el)
    })
  })

  newForm.addEventListener('submit', createNewUser)

  function createNewUser(e) {

    e.preventDefault();
    let createdUserRole = []

    for (let roles of newForm.role.options) {
      if (roles.selected) {
        createdUserRole.push({
          id: roles.value,
          name: roles.name
        })
      }
    }
    fetch(urlAdmin, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({
        username: newForm.firstName.value,
        lastName: newForm.lastName.value,
        age: newForm.ages.value,
        email: newForm.email.value,
        password: newForm.password.value,
        roles: createdUserRole
      })
    })
    .then(() => {
      newForm.reset()
      allUsers()
      $('#usersTable').click()
    })
  }
}