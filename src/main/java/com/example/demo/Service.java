package com.example.demo;

import java.util.*;
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;

import com.example.demo.Event;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonParser.Feature;
import com.fasterxml.jackson.databind.JsonMappingException;
//import java.util.List;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
public class Service {
	
	
  

  public  LocalDate CalculateEndDateForEvent(LocalDate startDate, String periodType)
  { 
    LocalDate lastDate = startDate;
    switch(periodType) {
      case "w":    	
        lastDate = startDate.plusDays(6);
        break;
      case "m":
        lastDate = startDate.with(TemporalAdjusters.lastDayOfMonth());
        break;
      case "q":
        LocalDate firstDayOfQuarter = startDate.with(startDate.getMonth().firstMonthOfQuarter()).with(TemporalAdjusters.firstDayOfMonth());
        lastDate = firstDayOfQuarter.plusMonths(2).with(TemporalAdjusters.lastDayOfMonth());
        break;
      default:
        // code block
    }
    return lastDate;
  }
	
	 @GetMapping("/getEvents/{startDate}/{timePeriodId}")
	 EventResponse getEvents(@PathVariable(value = "startDate") String startDate,@PathVariable(value = "timePeriodId") String timePeriodId) throws JsonParseException, JsonMappingException, IOException {
		//Event[] response =new Event[];
		 List<Event> eventsList =new ArrayList<Event>();
		 EventResponse response=new EventResponse();

		 LocalDate stDate = LocalDate.parse(startDate);
		 LocalDate lastDate = CalculateEndDateForEvent(stDate, timePeriodId);
		   
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(Feature.ALLOW_UNQUOTED_CONTROL_CHARS, true);

        ClassLoader classLoader = getClass().getClassLoader();
        //File file = new File(classLoader.getResource("assignment_data_full.json").getFile());
        
        InputStream inputStream = classLoader.getResourceAsStream("assignment_data_full.json");
        BufferedReader br = new BufferedReader(new InputStreamReader(inputStream, "UTF-8"));
        StringBuilder responseStrBuilder = new StringBuilder();
        String inputStr;
        while ((inputStr = br.readLine()) != null)
            responseStrBuilder.append(inputStr);
        String eventString = responseStrBuilder.toString();
        
        Event[] events = objectMapper.readValue(eventString, Event[].class);
       
        for(int i=0;i<events.length;i++)
        {
        	LocalDate eventDate=LocalDate.parse(events[i].event_date);
        
        	if(eventDate.compareTo(lastDate) *(stDate.compareTo(eventDate))>0)
        	{
        		eventsList.add(events[i]);
        	}
        	
        	
        }
        response.Data=eventsList;
        response.StartDate=stDate;
        response.EndDate=lastDate;
        return response;
	   
	  }
	 
	 @GetMapping("/getEventDetails/{eventId}")
	 EventDetailsResponse getEvents(@PathVariable(value = "eventId") int eventId) throws JsonParseException, JsonMappingException, IOException {
		//Event[] response =new Event[];
		// List<Event> eventsList =new ArrayList<Event>();
		 EventDetailsResponse response=new EventDetailsResponse();

			
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(Feature.ALLOW_UNQUOTED_CONTROL_CHARS, true);

        ClassLoader classLoader = getClass().getClassLoader();
        File file = new File(classLoader.getResource("assignment_data_full.json").getFile());
        Event[] events = objectMapper.readValue(file, Event[].class);
       
        for(int i=0;i<events.length;i++)
        {
        	  	if(events[i].event_size==eventId)
        	{
        	  		response.EventDetails=events[i].event_details;
        		
        	}
        	
        	
        }
       
        return response;
	   
	  }

}
