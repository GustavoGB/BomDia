package mvc.model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;


import com.mysql.jdbc.Statement;

public class DAO {
	private Connection connection = null;

	public DAO() {
		try {
			Class.forName("com.mysql.jdbc.Driver");
			connection = DriverManager.getConnection("jdbc:mysql://localhost/bom_dia", "root", "lhbDtN5Ee3JPnm2AedHr");
		} catch (SQLException | ClassNotFoundException e)
		{e.printStackTrace();}
	}
	
	public Integer addUser(User user) {
		 
		try {
			String sql = "INSERT INTO User (phone, password, name, profile_picture) VALUES (?,?,?,?)";
			PreparedStatement stmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
			stmt.setString(1,user.getPhone());
			stmt.setString(2,user.getPassword());
			stmt.setString(3,user.getName());
			stmt.setString(4,user.getProfilePicture());
			stmt.execute();
				
			ResultSet rs = stmt.getGeneratedKeys();
			rs.next();
			Integer key = rs.getInt(1);
			stmt.close();
			
			
			return key;
		} catch (SQLException e) {e.printStackTrace();}
		return null;
	}
	
	public void alteraUser(User user) {
		 try {
			 String sql = "UPDATE User SET phone=?, password=?, name=?, profile_picture=? WHERE id=?";
			 PreparedStatement stmt = connection.prepareStatement(sql);
			 stmt.setString(1, user.getPhone());
			 stmt.setString(2, user.getPassword());
			 stmt.setString(3, user.getName());
			 stmt.setString(4, user.getProfilePicture());
			 stmt.executeUpdate();
			 stmt.close();
			 } catch(SQLException e) {System.out.println(e);}
	}
	
	public User get(User user) {
		String sql = "SELECT * from User WHERE phone=? AND password=?";
		PreparedStatement stmt;
		User queryUser = new User();
		
		try {
			stmt = connection.prepareStatement(sql);
			stmt.setString(1, user.getPhone());
			stmt.setString(2, user.getPassword());
			
			ResultSet rs = stmt.executeQuery();
			while (rs.next()) {
				queryUser.setId(rs.getInt("id"));
				queryUser.setProfilePicture(rs.getString("profile_picture"));
				queryUser.setName(rs.getString("name"));
				queryUser.setPhone(rs.getString("phone"));
			}
			rs.close();
			stmt.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return queryUser;
	}
	
	
	public void addMessage(Message message){
		try {
			String sql = "INSERT INTO Message (user_id, content, towhom, hour, is_active, is_deleted) VALUES (?,?,?,?,?,?)";
			PreparedStatement stmt = connection.prepareStatement(sql);
			stmt.setInt(1, message.getUserId());
			stmt.setString(2, message.getContent());
			stmt.setString(3,message.getToWhom());
			stmt.setInt(4,message.getHour());
			stmt.setInt(5, 1);
			stmt.setInt(6, 0);
					
			stmt.execute();
			stmt.close();
		} catch (SQLException e) {e.printStackTrace();}
	}
	
	public void removeMessage(Message message) {
		 try {
		 PreparedStatement stmt = connection.prepareStatement("UPDATE Message SET is_deleted=? WHERE id=?");
		 stmt.setInt(1, 1);
		 stmt.setInt(2, message.getId());
		 stmt.execute();
		 stmt.close();
		 } catch(SQLException e) {System.out.println(e);}
	}
	
	public void alteraMessage(Message message) {
		 try {
			 String sql = "UPDATE Message SET content=?, towhom=?, hour=?, is_active=?, is_deleted=? WHERE id=?";
			 PreparedStatement stmt = connection.prepareStatement(sql);
			 stmt.setString(1, message.getContent());
			 stmt.setString(2, message.getToWhom());
			 stmt.setInt(3, message.getHour());
			 stmt.setInt(4, message.getIsActive());
			 stmt.setInt(5, message.getIsDeleted());
			 stmt.setInt(6,  message.getId());
			 stmt.executeUpdate();
			 stmt.close();
			 } catch(SQLException e) {System.out.println(e);}
	}
	
	public List<Message> getList(User user) {
		 List<Message> messages = new ArrayList<Message>();
		 try {
			 PreparedStatement stmt = connection.prepareStatement("SELECT * FROM Message WHERE user_id="+ user.getId() + " AND is_deleted=0");
			 ResultSet rs = stmt.executeQuery();
		 while (rs.next()) {
			 Message message = new Message();
			 message.setId(rs.getInt("id"));
			 message.setUserId(rs.getInt("user_id"));
			 message.setContent(rs.getString("content"));
			 message.setToWhom(rs.getString("towhom"));
			 message.setHour(rs.getInt("hour"));
			 message.setIsActive(rs.getInt("is_active"));
			 message.setIsDeleted(rs.getInt("is_deleted"));

		
		 messages.add(message);
		 }
		 rs.close();
		 stmt.close();
		 } catch(SQLException e) {System.out.println(e);}
		 return messages;
	}
	
	public List<Message> getHourlyList(Integer hour) {
		 List<Message> messages = new ArrayList<Message>();
		 try {
			 PreparedStatement stmt = connection.prepareStatement("SELECT * FROM Message WHERE hour="+ hour + " AND is_deleted=0");
			 ResultSet rs = stmt.executeQuery();
		 while (rs.next()) {
			 
			 Message message1 = new Message();
			 message1.setId(rs.getInt("id"));
			 message1.setContent(rs.getString("content"));
			 message1.setToWhom(rs.getString("towhom"));
			 message1.setHour(rs.getInt("hour"));
			 message1.setIsActive(rs.getInt("is_active"));
			 message1.setIsDeleted(rs.getInt("is_deleted"));

		
		 messages.add(message1);
			  
	
		 }
		 rs.close();
		 stmt.close();
		 } catch(SQLException e) {System.out.println(e);}
		 return messages;
	}
		
	
	public void close() {
	 	  try { connection.close();}
	 	  catch (SQLException e) {e.printStackTrace();}
	}
		
}	























