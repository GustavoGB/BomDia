package mvc.model;

public class User {
	private Integer id;
	private String phone;
	private String password;
	private String profilePicture;
	private String name;
	
	public Integer getId() {return id;}
	public void setId(Integer id) {this.id = id;}

	public String getPhone() {return phone;}
	public void setPhone(String phone) {this.phone = phone;}

	public String getPassword() {return password;}
	public void setPassword(String password) {this.password = password;}

	public String getProfilePicture() {return profilePicture;}
	public void setProfilePicture(String profilePicture) {this.profilePicture = profilePicture;}

	public String getName() {return name;}
	public void setName(String name) {this.name = name;}

	
}

