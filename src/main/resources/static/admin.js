//Get allUsers adminPage
$(async function () {
  await allUsers()

});
const urlAdmin = "http://localhost:8080/api/admin/"
const table = $('#adminTable')

async function allUsers() {
  table.empty()
  fetch(urlAdmin)
  .then(res => res.json())
  .then(data => {
    data.forEach(user => {
      let tableOfUsers = `$(
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.username}</td>
                            <td>${user.lastName}</td>
                            <td>${user.age}</td>
                            <td>${user.email}</td>
                            <td>${user.stringOfRoles}</td>
                            <td>
                                <button type="button" class="btn btn-info" data-toggle="modal" id="buttonEdit"
                                data-action="edit" data-id="${user.id}" data-target="#editModal">Edit</button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-danger" data-toggle="modal" id="buttonDelete"
                                data-action="delete" data-id="${user.id}" data-target="#deleteModal">Delete</button>
                            </td>
                        </tr>)`;
      table.append(tableOfUsers);
    })
  })
}
