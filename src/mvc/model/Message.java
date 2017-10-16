package mvc.model;

public class Message {
	private Integer id;
	private Integer userId;
	private String content;
	private String toWhom;
	private String gifTag;
	private Integer hour;
	private Integer isActive;
	private Integer isDeleted;
	
	public Integer getId() {return id;}
	public void setId(Integer id) {this.id = id;}
	
	public Integer getUserId() {return userId;}
	public void setUserId(Integer userId) {this.userId = userId;}
	
	public String getContent() {return content;}
	public void setContent(String content) {this.content = content;}
	
	public String getToWhom() {return toWhom;}
	public void setToWhom(String toWhom) {this.toWhom = toWhom;}
	
	public Integer getHour() {return hour;}
	public void setHour(Integer hour) {this.hour = hour;}
	
	public Integer getIsActive() {return isActive;}
	public void setIsActive(Integer isActive) {this.isActive = isActive;}
	
	public Integer getIsDeleted() {return isDeleted;}	
	public void setIsDeleted(Integer isDeleted) {this.isDeleted = isDeleted;}
	public String getGifTag() {
		return gifTag;
	}
	public void setGifTag(String gifTag) {
		this.gifTag = gifTag;
	}

}
