package mvc.controller;

import mvc.controller.SMSController;

public class TestSMS {
	public static void main(String[] args) {
	    String teste = new SMSController().SendSMS("11970691356","Hey honey");
	    System.out.print(teste);
	  }

}
