package mvc.controller;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import mvc.model.DAO;
import mvc.model.Message;
import mvc.model.User;

public class HourlySMS {
	static Boolean isRunningThread = false;
	
	void RunHourlySMS() {
		System.out.println("Called");
		Thread t = new Thread() {
		    @Override
		    public void run() {
		        while(true) {
		            try {
		            	Thread.sleep(1000*60*60);
//		                Thread.sleep(1000*20); // DEBUG!
		                
		                Calendar cal = Calendar.getInstance();
		                cal.setTime(new Date());  
		                int currentHour = cal.get(Calendar.HOUR_OF_DAY);
		                
		                mvc.model.DAO dao = new DAO();
		                List<Message> messages = dao.getHourlyList(currentHour);
		                
		                SMSController smsController = new SMSController();
		                
		                System.out.println("Sending hourly SMS");
		                for (Message message : messages) {
							smsController.SendSMS(message.getToWhom(), message.getContent());
						}

		            } catch (InterruptedException ie) {
		            }
		        }
		    }
		};
		t.start();
	}
	
	void RunsThreadIfNecessary() {
		if (isRunningThread == false){
			isRunningThread = true;
			RunHourlySMS();
		}
	}
}
