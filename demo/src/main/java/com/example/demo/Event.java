package com.example.demo;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

//import java.util.Date;

public class Event {
	// @JsonFormat(pattern="yyyy-MM-dd")
  public String event_date;
	//: "2015-11-18",
  public String event_type;  //" : "eos",
  public String event_summary; //" : "est molestias sit laborum aut est minus",
  public  int event_size; //" : "195271",
  @JsonIgnoreProperties
  public String event_details; //

}
