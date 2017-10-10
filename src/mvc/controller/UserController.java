package mvc.controller;
import java.io.StringWriter;

import org.json.JSONObject;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import
org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import mvc.model.User;

@RestController
@CrossOrigin
@RequestMapping(value = "/user")
public class UserController {
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<User> get() {

        User user = new User();
        user.setName("Lel22222o");
        user.setPhone("1197069512");
        user.setPassword("123456");
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<User> update(@RequestBody User user) {
        if (user != null) {
            user.setID(1);
        }

        // TODO: call persistence layer to update
        
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }
}