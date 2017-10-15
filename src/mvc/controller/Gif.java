package mvc.controller;

import at.mukprojects.giphy4j.Giphy;
import at.mukprojects.giphy4j.entity.search.SearchRandom;
import at.mukprojects.giphy4j.exception.GiphyException;

public class Gif {
	public String Random(String tag){
		String API_KEY = "Wo19YCgoUKvwTL13iOUGk996jNJalLOd";
		
		Giphy giphy = new Giphy(API_KEY);
		
		SearchRandom giphyData = null;
		try {
			giphyData = giphy.searchRandom(tag);
		} catch (GiphyException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return giphyData.getData().getImageOriginalUrl();
		
		
	}

}