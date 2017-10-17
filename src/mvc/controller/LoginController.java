package mvc.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import
org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


import mvc.model.DAO;
import mvc.model.User;

@RestController
@CrossOrigin
@RequestMapping(value = "/login")
public class LoginController {    
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<User> update(@RequestBody User user) {
    	mvc.model.DAO dao = new DAO();
    	User loggedUser = dao.get(user);
    
        if (loggedUser!= null) {
        	return new ResponseEntity<User>(loggedUser, HttpStatus.OK);
        }
        return new ResponseEntity<User>(loggedUser, HttpStatus.BAD_REQUEST);       
    }
}