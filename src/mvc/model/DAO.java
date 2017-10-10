package mvc.model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DAO {
	private Connection connection = null;

	public DAO() {
		try {
			Class.forName("com.mysql.jdbc.Driver");
			connection = DriverManager.getConnection("jdbc:mysql://localhost/bom_dia", "root", "07061997");
		} catch (SQLException | ClassNotFoundException e)
		{e.printStackTrace();}
	}
	
	public void addUser(User user){
		try {
//			alterar aqui se colocar foto de perfil
			String sql = "INSERT INTO User (phone, password, name), values(?,?,?)";
			PreparedStatement stmt = connection.prepareStatement(sql);
			stmt.setString(1,user.getPhone());
			stmt.setString(2,user.getPassword());
//			stmt.setString(3,user.getProfilePicture());
			stmt.setString(3,user.getName());
			
			stmt.execute();
			stmt.close();
		} catch (SQLException e) {e.printStackTrace();}
	}
	
	public void addMessage(Message message){
		try {
			String sql = "INSERT INTO Message (user_id, content, towhom, hour, is_active, is_deleted), values(?,?,?,?,?,?)";
			PreparedStatement stmt = connection.prepareStatement(sql);
			stmt.setString(1, message.getUserId());
			stmt.setString(2, message.getContent());
			stmt.setString(3,message.getToWhom());
			stmt.setString(4,message.getHour());
			stmt.setString(5, message.getIsActive());
			stmt.setString(6, message.getIsDeleted());
					
			stmt.execute();
			stmt.close();
		} catch (SQLException e) {e.printStackTrace();}
	}
	
	public List<Message> getList(User user) {
		 List<Message> messages = new ArrayList<Message>();
		 try {
			 PreparedStatement stmt = connection.prepareStatement("SELECT * FROM Message WHERE id="+ user.getId());
			 ResultSet rs = stmt.executeQuery();
		 while (rs.next()) {
			 Message message = new Message();
			 message.setId(rs.getLong("id"));
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
	
	public void removeMessage(Message message) {
		try {
			 PreparedStatement stmt =
	connection.prepareStatement("DELETE FROM Tarefa WHERE id=?");
			 stmt.setLong(1, tarefa.getId());
			 stmt.execute();
			 stmt.close();
	}
	
}	























