package ru.kata.spring.boot_security.demo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.configs.WebSecurityConfig;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

@RestController
@RequestMapping("/api")
public class Controller {

    @Autowired
    UserService userService;

    @GetMapping("/user")
    public ResponseEntity<User> userPage() {

        return new ResponseEntity<>(userService.getAuthenticatedUser(), HttpStatus.OK);
    }

    @GetMapping("/admin")
    public ResponseEntity<List<User>> showAllUsers() {

        return new ResponseEntity<>(userService.listUsers(), HttpStatus.OK);
    }

    @GetMapping("/roles")
    public ResponseEntity<List<Role>> showAllRoles() {

        return new ResponseEntity<>(userService.getRoles(), HttpStatus.OK);
    }

    @PostMapping("/admin")
    public ResponseEntity<User> create(@RequestBody User user) {

        if (user != null) {
            userService.create(user);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("/admin/{id}")
    public ResponseEntity<User> update(@RequestBody User user) {
        if (!user.getPassword().equals(userService.findById(user.getId()).getPassword())) {
            user.setPassword(WebSecurityConfig.passwordEncoder().encode(user.getPassword()));
        }
        userService.edit(user);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") Long id) {

        userService.delete(id);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/admin/{id}")
    public ResponseEntity<User> showUser(@PathVariable("id") Long id) {

        return new ResponseEntity<>(userService.findById(id), HttpStatus.OK);
    }
}
