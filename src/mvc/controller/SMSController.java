package mvc.controller;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;


public class SMSController {
	
	// Find your Account Sid and Token at twilio.com/user/account
	  public static final String ACCOUNT_SID = "AC440f1159d43cf5efe72cf42c26e390a8";
	  public static final String AUTH_TOKEN = "adef5396f122adb8dfc4fb52eb8e02a6";
	  public static final String TWILIO_PHONE_NUMBER = "+12566935667";

	  public SMSController(){
	    Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
	  }
	  
	public String SendSMS(String to, String content) {
		Message message = Message.creator(new PhoneNumber("+55" + to),
		        new PhoneNumber(TWILIO_PHONE_NUMBER), content).create();

		    System.out.println(message.getSid());
		    return message.getSid();
	}
}
