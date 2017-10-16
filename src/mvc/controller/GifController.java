package mvc.controller;

import org.json.JSONObject;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;

public class GifController {
	public String Random(String tag){
		String API_KEY = "Wo19YCgoUKvwTL13iOUGk996jNJalLOd";
		
		HttpResponse<JsonNode> jsonResponse;
		try {
			jsonResponse = Unirest.get("https://api.giphy.com/v1/gifs/random")
					  .header("accept", "application/json")
					  .queryString("api_key", "Wo19YCgoUKvwTL13iOUGk996jNJalLOd")
					  .queryString("tag", tag)
					  .asJson();
			
			// retrieve the parsed JSONObject from the response
			JSONObject myObj = jsonResponse.getBody().getObject();

			// extract data.url from the response
			String msg = myObj.getJSONObject("data").getString("url");
			return msg;
		} catch (UnirestException e) {
			e.printStackTrace();
		}

		// Error
		return "";
	}

}