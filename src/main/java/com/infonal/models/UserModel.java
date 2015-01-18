package com.infonal.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document
public class UserModel {
	
	
	@Id
	String id;
	String name;
	String surname;
	String phone;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSurname() {
		return surname;
	}
	public void setSurname(String surname) {
		this.surname = surname;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	public String toString(){
		return "{\"id\":\"" + this.getId() + "\",\"name\":\"" + this.getName() +  "\",\"surname\":\"" + this.getSurname()
				+ "\",\"phone\":" + this.getPhone() + "\"}";
	}
}
