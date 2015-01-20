package com.infonal.UserServiceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.infonal.UserService.UserService;
import com.infonal.models.UserModel;

@Service
public class UserServiceImpl implements UserService{
	
	
	@Autowired
	private MongoTemplate mongoTemplate;
	
	private static final Logger logger = LogManager.getLogger(UserServiceImpl.class.getName());
	
	public static final String COLLECTION_NAME = "users";

	@Override
	public String addUser(UserModel user) {
		if (!mongoTemplate.collectionExists(UserModel.class)) {
			mongoTemplate.createCollection(UserModel.class);
		}       
		user.setId(UUID.randomUUID().toString());
		mongoTemplate.insert(user, COLLECTION_NAME);
		logger.debug("Inserted user into database. {ID: " + user.getId() + "}");
		return user.getId();
	}

	@Override
	public List<UserModel> getUsers() {
		List<UserModel> users = new ArrayList<UserModel>();
		users = mongoTemplate.findAll(UserModel.class, COLLECTION_NAME);
		if(!users.isEmpty()) 
			logger.debug("Found " + users.size() + " users in the database. Returning.");
		else
			logger.debug("No users found in the database.");
		return users;
	}

	@Override
	public void deleteUser(UserModel user) {
		mongoTemplate.remove(user, COLLECTION_NAME);
		logger.debug("Deleted user. {ID: " + user.getId() + "}");
	}

	@Override
	public void updateUser(UserModel user) {
		mongoTemplate.save(user, COLLECTION_NAME);
		logger.debug("Updated user. {ID: " + user.getId() + "}");
	}
}
