package mvc.controller;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;


public class SMSController {
	
	// Find your Account Sid and Token at twilio.com/user/account
	  public static final String ACCOUNT_SID = "ACa03f5e0c1fbafab6a07dee5e897e6a20";
	  public static final String AUTH_TOKEN = "9d636a648639be661daad162545056a7";
	  public static final String TWILIO_PHONE_NUMBER = "+12566935667";

	  public SMSController(){
	    Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
	  }
	  
	public String SendSMS(String to, String content) {
		Message message = Message.creator(new PhoneNumber("+55" + to),
		        new PhoneNumber("+12566935667"), content).create();
		    return message.getSid();
	}
}
