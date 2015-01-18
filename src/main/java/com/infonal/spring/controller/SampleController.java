/*
 * Controller class for Spring MVC
 */
package com.infonal.spring.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.infonal.UserServiceImpl.UserService;
import com.infonal.models.UserModel;

@Controller
public class SampleController{

	@Autowired
	private UserService userService;

	@RequestMapping(value = "/users", method = RequestMethod.GET)  
	public String getUserList(ModelMap model) {  
		model.addAttribute("userList", userService.getUsers());  
		return "index";  
	}

	@RequestMapping(value = "/user/update", method = RequestMethod.POST)  
	public @ResponseBody String updateUser(HttpServletRequest request, HttpServletResponse response) {
		UserModel user = new UserModel();
		user.setId(request.getParameter("id"));
		user.setName(request.getParameter("name"));
		user.setSurname(request.getParameter("surname"));
		user.setPhone(request.getParameter("phone"));
		
		userService.updateUser(user);

		return "Update successful";  
	}

	@RequestMapping(value = "/user/delete", method = RequestMethod.POST)  
	public @ResponseBody String deleteUser(HttpServletRequest request, HttpServletResponse response) {  
		UserModel user = new UserModel();
		user.setId(request.getParameter("id"));
		userService.deleteUser(user);  
		return "Delete successful";  
	}

	@RequestMapping(value = "/user/add", method = RequestMethod.POST)
	public @ResponseBody String addUser(HttpServletRequest request, HttpServletResponse response) {
		UserModel user = new UserModel();
		String name = request.getParameter("name");
		String surname = request.getParameter("surname");
		String phone = request.getParameter("phone");

		user.setName(name);
		user.setSurname(surname);
		user.setPhone(phone);

		return userService.addUser(user);
	}
}
