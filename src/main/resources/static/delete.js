$(async function () {
  await userDelete()
})

// Modal delete window
$('#deleteModal').on('show.bs.modal', event => {
  let button = $(event.relatedTarget)
  let id = button.data('id')
  deleteModal(id)
})

async function deleteModal(id) {
  let user = await getUser(id)
  document.getElementById('deleteId').value = user.id
  document.getElementById('usernameDelete').value = user.username
  document.getElementById('lastNameDelete').value = user.lastName
  document.getElementById('ageDelete').value = user.age
  document.getElementById('emailDelete').value = user.email

  $('#deleteRole').empty()

  await fetch(urlRoles)
  .then(res => res.json())
  .then(roles => {
    roles.forEach(role => {
      selectedRole = false
      for (const curRole of user.roles) {
        if(curRole.name === role.name) {
          selectedRole = true
        }
      }
      let element = document.createElement("option")
      element.value = role.id
      element.text = role.name.replaceAll("ROLE_", " ")
      if (selectedRole) element.selected = true
      $('#deleteRole').append(element)
    })
  })
}
async function getUser(id) {
  let userRes = await fetch(urlAdmin + id)
  return await userRes.json()
}



// Delete user
async function userDelete() {

  let deleteForm = document.forms["deleteForm"]

  deleteForm.addEventListener('submit', userDeleteEvent)

  function userDeleteEvent(event) {
    event.preventDefault()

    fetch(urlAdmin + deleteForm.id.value, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }
    )
    .then(() => {
      $('#delBtn').click()
      allUsers()
    })

  }
}