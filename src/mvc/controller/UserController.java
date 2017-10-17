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
@RequestMapping(value = "/user")
public class UserController {
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<User> update(@RequestBody User user) {
    	mvc.model.DAO dao = new DAO();
    	Integer key = dao.addUser(user);
    	
        if (key!= null) {
            user.setId(key);
        }
        
        // TODO: call persistence layer to update
        
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }
}