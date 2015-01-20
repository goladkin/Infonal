package com.infonal.UserService;

import java.util.List;

import com.infonal.models.UserModel;

public interface UserService {
	
	public String addUser(UserModel user);
	
	public List<UserModel> getUsers();
	
	public void deleteUser(UserModel user);

	public void updateUser(UserModel user);
}
