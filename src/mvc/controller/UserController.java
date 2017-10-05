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
public class UserController {
//    @RequestMapping("/user")
//    public String execute() {
//        System.out.println("Lógica do MVC");
//        
//     // Response with new note created
//     		JSONObject noteJson = new JSONObject();
//     		noteJson.put("username", "marcelo");
//     		noteJson.put("password", "elisa");
//
//     		StringWriter out = new StringWriter();
//     		noteJson.write(out);
//     		String jsonText = out.toString();
//     		
//     		System.out.println(jsonText);
//        
//        return "info";
//    }
    
    @RequestMapping(value = "/user", method = RequestMethod.POST)
    public ResponseEntity<?> createUser(@RequestBody User user, UriComponentsBuilder ucBuilder) {
        System.out.println(user.getName());
        System.out.println(user.getId());
         
//        userService.saveUser(user);
 
        HttpHeaders headers = new HttpHeaders();
//        headers.setLocation(ucBuilder.path("/api/user/{id}").buildAndExpand(user.getId()).toUri());
        return new ResponseEntity<String>(headers, HttpStatus.CREATED);
    }
}