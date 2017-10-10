package mvc.controller;
import java.io.StringWriter;

import org.json.JSONObject;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import
org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import mvc.model.User;

@RestController
@RequestMapping(value = "/user")
public class UserController {
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ResponseEntity<User> get() {

        User user = new User();
        user.setName("Lelo");
        user.setPhone("1197069512");
        user.setPassword("123456");
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }
    
    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ResponseEntity<User> update(@RequestBody User user) {
    	System.out.println("Chamado");
        if (user != null) {
            user.setId(1);
        }

        // TODO: call persistence layer to update
        
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }
    
//    @RequestMapping(value = "/user", method = RequestMethod.POST)
//    public ResponseEntity<?> createUser(@RequestBody User user, UriComponentsBuilder ucBuilder) {
//        System.out.println(user.getName());
//        System.out.println(user.getId());
//         
////        userService.saveUser(user);
// 
//        HttpHeaders headers = new HttpHeaders();
////        headers.setLocation(ucBuilder.path("/api/user/{id}").buildAndExpand(user.getId()).toUri());
//        return new ResponseEntity<String>(headers, HttpStatus.CREATED);
//    }
}