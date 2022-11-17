$(async function () {
  await userEdit()
})
//Modal edit window
let selectedRole = false

$('#editModal').on('show.bs.modal', event => {
  let button = $(event.relatedTarget)
  let id = button.data('id')
  editModal(id)
})

async function editModal(id) {
  $('#editRole').empty()
  let user = await getUser(id)
  document.getElementById('id').value = user.id
  document.getElementById('firstNameEdit').value = user.username
  document.getElementById('lastNameEdit').value = user.lastName
  document.getElementById('ageEdit').value = user.age
  document.getElementById('emailEdit').value = user.email
  document.getElementById('passwordEdit').value = user.password

  await fetch(urlRoles)
  .then(res => res.json())
  .then(roles => {
    roles.forEach(role => {
      selectedRole = false
      for (const curRole of user.roles) {
        if (curRole.name === role.name) {
          selectedRole = true
        }
      }
      let element = document.createElement("option");
      element.value = role.id
      element.text = role.name.replaceAll("ROLE_", " ")
      if (selectedRole) {
        element.selected = true
      }
      $('#editRole').append(element)
    })
  });
}

//Edit user
async function userEdit() {

  let editForm = document.forms["editForm"]

  editForm.addEventListener('submit', userEditEvent)

  function userEditEvent(event) {
    event.preventDefault()
    let editUserRole = []
    console.log(editForm.rolesList)
    console.log(editForm.id.value)

    for (let roles of editForm.rolesList.options) {

      if (roles.selected) {
        editUserRole.push({
          id: roles.value,
          name: roles.name
        })
      }
    }

    fetch(urlAdmin + editForm.id.value, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({
        id: editForm.id.value,
        username: editForm.firstName.value,
        lastName: editForm.lastName.value,
        age: editForm.age.value,
        email: editForm.email.value,
        password: editForm.password.value,
        roles: editUserRole
      })
    })
    .then(() => {
      $('#editBtn').click()
      allUsers()
    })

  }
}


