const userUrl = "http://localhost:8080/api/user"

$(async function () {
  await actualUser()
});

function actualUser() {
  fetch(userUrl)
  .then(res => res.json())
  .then(user => {
    $('#usernameOnHeader').append(user.email)
    let roles = user.stringOfRoles
    $('#rolesHeader').append(roles)

    let userData = `$(
      <tr>
      <td>${user.id} </td>
  <td>${user.username}</td>
  <td>${user.lastName}</td>
  <td>${user.age}</td>
  <td>${user.email}</td>
  <td>${user.stringOfRoles}</td>`
    $('#userBody').append(userData)
  })
}



