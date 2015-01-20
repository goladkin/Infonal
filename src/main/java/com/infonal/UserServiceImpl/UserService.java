package com.infonal.UserServiceImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import com.infonal.models.UserModel;

@Repository
public class UserService{

	@Autowired
	private MongoTemplate mongoTemplate;

	public static final String COLLECTION_NAME = "users";

	public String addUser(UserModel user) {
		if (!mongoTemplate.collectionExists(UserModel.class)) {
			mongoTemplate.createCollection(UserModel.class);
		}       
		user.setId(UUID.randomUUID().toString());
		mongoTemplate.insert(user, COLLECTION_NAME);
		return user.getId();
	}

	public List<UserModel> getUsers() {
		return mongoTemplate.findAll(UserModel.class, COLLECTION_NAME);
	}

	public void deleteUser(UserModel user) {
		mongoTemplate.remove(user, COLLECTION_NAME);
	}

	public void updateUser(UserModel user) {
		mongoTemplate.save(user, COLLECTION_NAME);
	}
}
