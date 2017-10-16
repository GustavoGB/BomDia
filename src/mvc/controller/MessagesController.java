package mvc.controller;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import
org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import mvc.model.DAO;
import mvc.model.Message;
import mvc.model.User;
import mvc.controller.GifController;

@RestController
@CrossOrigin
@RequestMapping(value = "/messages")
public class MessagesController {
    @RequestMapping(method = RequestMethod.GET)
    public List<Message> get(@RequestParam(value = "user_id") Integer userId) {
    	mvc.model.DAO dao = new DAO();
    	User user = new User();
    	user.setId(userId);
        List<Message> messages = dao.getList(user);
        
        return messages;
    }
    
    @RequestMapping(method = RequestMethod.POST)
    public String create(@RequestBody Message msg) {
    	mvc.model.DAO dao = new DAO();
    	
    	if (msg.getGifTag() != null) {
    		String gifUrl = new GifController().Random(msg.getGifTag());
    		msg.setContent(msg.getContent() + " " + gifUrl);
    	};
    	
    	dao.addMessage(msg);
        return "{\"ok\":true}";
    }
    
    @RequestMapping(method = RequestMethod.POST, value="/{messageId}" )
    public String update(@RequestBody Message msg) {
    	mvc.model.DAO dao = new DAO();
    	
    	if (msg.getGifTag() != null) {

    		String gifUrl = new GifController().Random(msg.getGifTag());
    		msg.setContent(msg.getContent() + " " + gifUrl);
    	};
    	
    	dao.alteraMessage(msg);
        return "{\"ok\":true}";
    }
    
    
}